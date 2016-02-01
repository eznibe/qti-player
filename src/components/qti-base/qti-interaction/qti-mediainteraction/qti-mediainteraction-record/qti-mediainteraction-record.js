var QtiMediaInteractionRecord = (function () {
	function QtiMediaInteractionRecord() { }

	QtiMediaInteractionRecord.prototype.created = function(){
		this.super();

		this.setup = {
			"controls": true,
			"autoplay": false,
			"loop": false,
			"width": 650,
			"height": 120,
			"plugins": {
				"wavesurfer": {
					"src": ""+this.data+"",
					"waveColor": "#b3ce41",
					"progressColor": "#b3ce41",
					"cursorColor": "#ffffff"
				},
				"volumeBars": {},
				"replayButton": {}
			}
		};

		this.htmlClasses = {
			RECORD: 'record',
			START_ICON: 'icon-start',
			START_BUTTON: 'button-record-start',
			STOP_BUTTON: 'record-button-stop',
			RESTART_BUTTON: 'record-button-restart',
			NO_MIC: 'button-no-mic',
			GET_READY: 'icon-get-ready',
			BUTTONS_WRAPPER: 'button-wrapper',
			WAVEFORM: 'vjs-waveform',
			ALIGN_AUDIO: 'align-audio'
		};

		this.analyserNode;
		this.recorder = null;
		this.recording = false;
		this.sampleRate = 44100;
		this.audioContext = null;
		this.context = null;
		this.audioInput = null;
		this.rafID = null;
		this.canvasWidth = null;
		this.canvasHeight = null;
		this.volume = null;
		this.recordingLength = 0;
		this.leftchannel = [];
		this.rightchannel = [];
		this.isDrag = false;
	};

	QtiMediaInteractionRecord.prototype.domReady = function () {
		this.super();
		this.removePlayerAudio();
		this.querySelectors();
		this.eventListeners();
	};

	QtiMediaInteractionRecord.prototype.removePlayerAudio = function () {
		var audio = this.shadowRoot.querySelector('audio');
		var source = this.shadowRoot.querySelector('audio source');
		audio.removeAttribute('src');
		source.remove();
	};

	QtiMediaInteractionRecord.prototype.startRecording = function() {
		this.leftchannel.length = this.rightchannel.length = 0;
		this.recordingLength = 0;
		this.featureDetection();
	};

	QtiMediaInteractionRecord.prototype.featureDetection = function() {
		var _this = this;
		if (!navigator.getUserMedia) {
			navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
		}
		if (!navigator.cancelAnimationFrame) {
			navigator.cancelAnimationFrame =
			navigator.webkitCancelAnimationFrame ||
			navigator.mozCancelAnimationFrame ||
			navigator.msCancelAnimationFrame;
		}
		if (!navigator.requestAnimationFrame) {
			navigator.requestAnimationFrame =
			navigator.webkitRequestAnimationFrame ||
			navigator.mozRequestAnimationFrame ||
			navigator.msRequestAnimationFrame;
		}

		navigator.getUserMedia({
			"audio": {
				"mandatory": {
					"googEchoCancellation": "false",
					"googAutoGainControl": "true",
					"googNoiseSuppression": "true",
					"googHighpassFilter": "false"
				},
				"optional": []
			},
		}, this.success.bind(this), function(e) {
			console.log('failed to initialise audio');
			_this.record.classList.add('allow-mic');
		});
	};

	QtiMediaInteractionRecord.prototype.success = function(stream) {
		var _this = this;

		this.audioContext = window.AudioContext || window.webkitAudioContext;
		this.context = new this.audioContext();

		this.volume = this.context.createGain();
		this.audioInput = this.context.createMediaStreamSource(stream);
		this.audioInput.connect(this.volume);

		this.analyserNode = this.context.createAnalyser();
		this.analyserNode.fftSize = 2048;
		this.volume.connect(this.analyserNode);

		var bufferSize = 2048;
		this.recorder = this.context.createScriptProcessor(bufferSize, 2, 2);

		this.recorder.onaudioprocess = function(e){
			if (!_this.recording) return;
			var left = e.inputBuffer.getChannelData (0);
			var right = e.inputBuffer.getChannelData (1);
			_this.leftchannel.push (new Float32Array (left));
			_this.rightchannel.push (new Float32Array (right));
			_this.recordingLength += bufferSize;
			console.log('%c Recording audio', 'color: #79B473');
		}

		this.volume.connect(this.recorder);
		this.recorder.connect(this.context.destination);
		this.initCountdown();
	};

	QtiMediaInteractionRecord.prototype.initCountdown = function() {
		var _this = this;
		this.startIcon.style.display = 'none';
		this.getReady.style.display = 'block';
		this.buttons.style.display = 'none';
		setTimeout(function() {
			_this.getReady.classList.add('icon-get-ready-2');
		}, 1000);
		setTimeout(function() {
			_this.getReady.classList.remove('icon-get-ready-2');
			_this.getReady.classList.add('icon-get-ready-1');
		}, 2000);
		setTimeout(function() {
			_this.getReady.classList.remove('icon-get-ready-1');
			_this.getReady.style.display = 'none';
			_this.buttons.style.display = 'block';
			_this.record.classList.add('recording');
			_this.recording = true;
		}, 3000);
		this.updateAnalysers();
	};

	QtiMediaInteractionRecord.prototype.updateAnalysers = function(time) {
		if (!this.analyserContext) {
			this.canvasWidth = this.canvas.width;
			this.canvasHeight = this.canvas.height;
			this.analyserContext = this.canvas.getContext('2d');
		}

		var SPACING = 9;
		var BAR_WIDTH = 6;
		var numBars = Math.round(this.canvasWidth / SPACING);

		var freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount);
		this.analyserNode.getByteFrequencyData(freqByteData);

		this.analyserContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.analyserContext.fillStyle = '#b7b6b4';
		var multiplier = this.analyserNode.frequencyBinCount / numBars - 12;

		for (var i = 0; i < numBars; ++i) {
			var magnitude = 0;
			var offset = Math.floor(i * multiplier);
			for (var j = 0; j< multiplier; j++) {
				magnitude += freqByteData[offset + j];
			}
			magnitude = magnitude / multiplier;
			var magnitude2 = freqByteData[i * multiplier];
			this.analyserContext.fillRect(i * SPACING, this.canvasHeight, BAR_WIDTH, -magnitude);
		}
		this.rafID = window.requestAnimationFrame(this.updateAnalysers.bind(this));
	};

	QtiMediaInteractionRecord.prototype.stopRecording = function() {
		this.recording = false;

		this.record.classList.remove('recording');
		this.record.classList.add('playback');

		var leftBuffer = this.mergeBuffers ( this.leftchannel, this.recordingLength );
		var rightBuffer = this.mergeBuffers ( this.rightchannel, this.recordingLength );
		var interleaved = this.interleave ( leftBuffer, rightBuffer );
		var buffer = new ArrayBuffer(44 + interleaved.length * 2);
		var view = new DataView(buffer);

		this.writeUTFBytes(view, 0, 'RIFF');
		view.setUint32(4, 44 + interleaved.length * 2, true);
		this.writeUTFBytes(view, 8, 'WAVE');
		this.writeUTFBytes(view, 12, 'fmt ');
		view.setUint32(16, 16, true);
		view.setUint16(20, 1, true);
		view.setUint16(22, 2, true);
		view.setUint32(24, this.sampleRate, true);
		view.setUint32(28, this.sampleRate * 4, true);
		view.setUint16(32, 4, true);
		view.setUint16(34, 16, true);
		this.writeUTFBytes(view, 36, 'data');
		view.setUint32(40, interleaved.length * 2, true);
		this.floatTo16BitPCM(view, 44, interleaved);

		var lng = interleaved.length;
		var index = 44;
		this.volume = 1;

		for (var i = 0; i < lng; i++){
			view.setInt16(index, interleaved[i] * (0x7FFF * this.volume), true);
			index += 2;
		}

		var blob = new Blob ( [ view ], { type : 'audio/wav' } );
		var url = (window.URL || window.webkitURL).createObjectURL(blob);

		this.cancelAnalyserUpdates();
		this.drawWaveform(url);
	};

	QtiMediaInteractionRecord.prototype.cancelAnalyserUpdates = function() {
		window.cancelAnimationFrame(this.rafID);
		this.rafID = null;
	};

	QtiMediaInteractionRecord.prototype.drawWaveform = function(url) {
		var audioElement = document.createElement("audio");
		audioElement.setAttribute('id', 'playback');
		audioElement.setAttribute('class', 'contain-media video-js vjs-mindtree-skin recording');
		this.recordBody.appendChild(audioElement);
		this.playback = this.shadowRoot.querySelector('#playback');

		videojs(this.playback, {
			"controls": true,
			"autoplay": false,
			"loop": false,
			"width": 650,
			"height": 120,
			"plugins": {
				"wavesurfer": {
					"src": ""+url+"",
					"waveColor": "#ffe039",
					"progressColor": "#ffe039",
					"cursorColor": "#ffffff"
				},
				"volumeBars": {},
				"replayButton": {}
			}
		}).ready(function() {});

		this.alignAudio();
	};

	QtiMediaInteractionRecord.prototype.alignAudio = function(e) {
		var _this = this;
		this.align = this.shadowRoot.querySelector('.wrapper-record .vjs-waveform');
		this.align.style.cursor = '-webkit-grab';
		this.waveform = this.shadowRoot.querySelector('.wrapper-record .vjs-waveform wave');
		this.updatedPos = 0;
		this.align.addEventListener('mousedown', function(e) {
			_this.isDrag = true;
			_this.elementOffset = e.clientX;
			_this.align.style.cursor = '-webkit-grabbing';
			document.addEventListener('mousemove', function(e) {
				if (!_this.isDrag) return;
			console.log('DRAGGG')
				_this.offsetPos = e.clientX;
				_this.calculatePos = _this.updatedPos + _this.offsetPos - _this.elementOffset;
				_this.waveform.style.left = _this.calculatePos + 'px';
				e.stopPropagation();
				e.preventDefault();
			});
			document.addEventListener('mouseup', function(e) {
				_this.isDrag = false;
				_this.updatedPos = _this.calculatePos;
				_this.align.style.cursor = '-webkit-grab';
				document.removeEventListener('mousemove', function(e) {});
			});
		});
	};

	QtiMediaInteractionRecord.prototype.restartRecording = function() {
		this.record.classList.remove('playback');
		this.clearRecording();
		this.initCountdown();
	};

	QtiMediaInteractionRecord.prototype.clearRecording = function() {
		console.log('Recording cleared');
		videojs(this.playback).dispose();
		this.recordingLength = 0;
		this.leftchannel = [];
		this.rightchannel = [];
	};

	QtiMediaInteractionRecord.prototype.noMic = function() {
		this.record.classList.add('no-mic');
	};

	QtiMediaInteractionRecord.prototype.floatTo16BitPCM = function (output, offset, input) {
		for (var i = 0; i < input.length; i++, offset+=2) {
			var s = Math.max(-1, Math.min(1, input[i]));
			output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
		}
	};

	QtiMediaInteractionRecord.prototype.interleave = function (leftchannel, rightchannel) {
		var length = leftchannel.length + rightchannel.length;
		var result = new Float32Array(length);
		var inputIndex = 0;
		for (var index = 0; index < length;) {
			result[index++] = leftchannel[inputIndex];
			result[index++] = rightchannel[inputIndex];
			inputIndex++;
		}
		return result;
	};

	QtiMediaInteractionRecord.prototype.mergeBuffers = function (channelBuffer, recordingLength) {
		var result = new Float32Array(recordingLength);
		var offset = 0;
		var lng = channelBuffer.length;
		for (var i = 0; i < lng; i++) {
			var buffer = channelBuffer[i];
			result.set(buffer, offset);
			offset += buffer.length;
		}
		return result;
	};

	QtiMediaInteractionRecord.prototype.writeUTFBytes = function (view, offset, string) {
		var lng = string.length;
		for (var i = 0; i < lng; i++) {
			view.setUint8(offset + i, string.charCodeAt(i));
		}
	};

	QtiMediaInteractionRecord.prototype.querySelectors = function () {
		this.record = this.shadowRoot.querySelector('.' + this.htmlClasses.RECORD);
		this.buttons = this.shadowRoot.querySelector('.' + this.htmlClasses.BUTTONS_WRAPPER);
		this.getReady = this.shadowRoot.querySelector('.' + this.htmlClasses.GET_READY);
		this.recordBody = this.shadowRoot.querySelector('.record .wrapper-record .body');
		this.canvas = this.shadowRoot.querySelector('#analyser');
		this.playback = this.shadowRoot.querySelector('#playback');
		this.startIcon = this.shadowRoot.querySelector('.' + this.htmlClasses.START_ICON);
		this.startButton = this.shadowRoot.querySelector('.' + this.htmlClasses.START_BUTTON);
		this.stopButton = this.shadowRoot.querySelector('.' + this.htmlClasses.STOP_BUTTON);
		this.restartButton = this.shadowRoot.querySelector('.' + this.htmlClasses.RESTART_BUTTON);
		this.noMicButton = this.shadowRoot.querySelector('.' + this.htmlClasses.NO_MIC);
	};

	QtiMediaInteractionRecord.prototype.eventListeners = function () {
		var _this = this;
		this.startIcon.addEventListener('click', function() { _this.startRecording() });
		this.startButton.addEventListener('click', function() { _this.startRecording() });
		this.stopButton.addEventListener('click', function() { _this.stopRecording() });
		this.restartButton.addEventListener('click', function() { _this.restartRecording() ;});
		this.noMicButton.addEventListener('click', function() { _this.noMic() });
	};

	return QtiMediaInteractionRecord;
})();

Polymer('qti-mediainteraction-record', QtiMediaInteractionRecord.prototype);