var QtiMediaInteraction = (function () {
	function QtiMediaInteraction() { }

	var htmlClasses = {
		VIDEO: 'video-js',
		LETTERBOX: 'letterbox',
		HIDDEN: 'hidden',
		HOVER: 'hover',
		ACTIVE: 'vjs-control-active',
		SELECTED: 'vjs-control-selected',
		PAUSED: 'vjs-paused',
		REPLAY: 'vjs-replay',
		SUBTITLES: 'vjs-subtitles-button',
		TEXT_TRACK: 'vjs-text-track-display',
		PROGRESS: 'vjs-progress-control',
		MUTE: 'vjs-mute-control',
		VOLUME: 'vjs-volume-control',
		SLIDING: 'vjs-sliding',
		SLIDER: 'vjs-progress-holder',
		TOOLTIP: 'vjs-tip',
		TOOLTIP_INNER: 'vjs-tip-inner'
	};

	QtiMediaInteraction.prototype.created = function(){
		this.super();

		//get the object from the child
		var obj = this.querySelector('object');
		this.data = obj.getAttribute('data');
		this.type = obj.getAttribute('type');
		this.poster = "http://lorempixel.com/640/360/";

		/* video setup settings */
		this.setup = {
			"controls": true,
			"plugins":{
				"loader": {},
				"replayButton": {},
				"slowmoButton": {},
				"showBigPlayAtEnd": {},
				"subtitlesButton": {},
				"volumeBars": {},
				"keyboardControls": {},
				"toolTip": {},
				"progressHover": {},
				"cuePoints": {}
			}
		};
	};

	QtiMediaInteraction.prototype.domReady = function(){
		this.super();

		var video_el = this.shadowRoot.querySelector('.' + htmlClasses.VIDEO);

		// Register plugins
		videojs.plugin('loader', this.plugin_loader);
		videojs.plugin('replayButton', this.plugin_replayButton);
		videojs.plugin('slowmoButton', this.plugin_slowmoButton);
		videojs.plugin('showBigPlayAtEnd', this.plugin_showBigPlayAtEnd);
		videojs.plugin('subtitlesButton', this.plugin_subtitlesButton);
		videojs.plugin('volumeBars', this.plugin_volumeBars);
		videojs.plugin('keyboardControls', this.plugin_keyboardControls);
		videojs.plugin('toolTip', this.plugin_toolTip);
		videojs.plugin('progressHover', this.plugin_progressHover);
		videojs.plugin('cuePoints', this.plugin_cuePoints);
		this.wavesurfer();

		// Initialise the video player
		videojs(video_el, this.setup, this.mediaReady);
	};

	QtiMediaInteraction.prototype.mediaReady = function(){
	};

	QtiMediaInteraction.prototype.plugin_loader = function(options){
		var init;
		init = function() {
			var player, $loader;
			player = this;
			$loader = $(player.loadingSpinner.el());
			$loader.append($('<div></div><div></div><div></div>'));
		};
		this.on('loadedmetadata', init);
	};

	QtiMediaInteraction.prototype.plugin_replayButton = function(options){
		var player = this;
		var vjs = _V_;

		vjs.ReplayButton = vjs.Button.extend({
			init: function(player, options){
				vjs.Button.call(this, player, options);
				this.on('click', this.onClick);
			}
		});


		vjs.ReplayButton.prototype.onClick = function(){
			player.trigger('replay');
			player.addClass('vjs-replay');
			player.currentTime(0);
			// player.pause();
			player.on('play',function(){
				player.removeClass(htmlClasses.REPLAY);
				player.posterImage.hide();
				player.bigPlayButton.hide();
			});
		};

		player.ready(function(){
			var button = new vjs.ReplayButton(player, {
				el: vjs.Component.prototype.createEl(null, {
					className	: 'vjs-replay-control vjs-menu-button vjs-control',
					role		: 'button'
				})
			});
			player.controlBar.addChild(button);
		});
	};

	QtiMediaInteraction.prototype.plugin_slowmoButton = function(options){
		var player = this;
		var vjs = _V_;

		vjs.SlowmoButton = vjs.Button.extend({
			init: function(player, options){
				vjs.Button.call(this, player, options);
				this.on('click', this.onClick);
			}
		});

		vjs.SlowmoButton.prototype.onClick = function(){
			if(player.j['slowmo'] == true){
				player.j['slowmo'] = false;
				this.removeClass(htmlClasses.ACTIVE);
				player.playbackRate(1);
			} else {
				player.j['slowmo'] = true;
				this.addClass(htmlClasses.ACTIVE);
				player.playbackRate(0.5);
			}
		};

		player.ready(function(){
			var button = new vjs.SlowmoButton(player, {
				el: vjs.Component.prototype.createEl(null, {
					className	: 'vjs-slowmo-control vjs-menu-button vjs-control',
					role		: 'button'
				})
			});
			player.controlBar.addChild(button);
		});
	};

	QtiMediaInteraction.prototype.plugin_showBigPlayAtEnd = function(options){
		var player = this;

		player.on('ended', function(){
			player.posterImage.show();
			player.bigPlayButton.show();
			player.currentTime(0);
			player.pause();
			player.removeClass(htmlClasses.PAUSED);
		});

		player.on('play', function(){
			player.posterImage.hide();
			player.bigPlayButton.hide();
		});
	};

	QtiMediaInteraction.prototype.plugin_subtitlesButton = function(options){
		var init;
		init = function(){
			var player;
			player = this;
			$('.' + htmlClasses.SUBTITLES).on('click', function(){
				$('.' + htmlClasses.SUBTITLES).toggleClass(htmlClasses.ACTIVE);
				$('.' + htmlClasses.TEXT_TRACK).toggleClass(htmlClasses.HIDDEN);
			});
			if(player.textTracks){
				player.controlBar.subtitlesButton.addClass(htmlClasses.ACTIVE);
			} else {
				player.controlBar.subtitlesButton.removeClass(htmlClasses.ACTIVE);
			}
		};
		this.on('loadedmetadata', init);
	};

	QtiMediaInteraction.prototype.plugin_volumeBars = function(options){
		var player = this;
		var vjs = _V_;

		vjs.volumeBar = vjs.Button.extend({
			init: function(player, options){
				vjs.Button.call(this, player, options);
			}
		});

		var volumeBars = new vjs.volumeBar(player, {
			el: vjs.Component.prototype.createEl(null, {
				className	: 'vjs-volume-bars'
			})
		});

		var volumeBarsMask = new vjs.volumeBar(player, {
			el: vjs.Component.prototype.createEl(null, {
				className	: 'vjs-volume-bars-mask'
			})
		});

		for (var i = 0; i < 5; i++) {
			vjs["bar"+i] = vjs.Button.extend({
				init: function(player, options){
					vjs.Button.call(this, player, options);
					this.on('click', this.onClick);
				}
			});

			vjs["bar"+i].prototype.onClick = function(i){
				return function() {
						var setVolume = (i/5)+0.2;
					player.volume(setVolume);
				};
			}(i);

			volumeBars.addChild(
				new vjs["bar"+i](player, {
					el: vjs.Component.prototype.createEl(null, {
						className	: 'volume-bar vjs-control-active',
						role		: 'button'
					})
				})
			);
		}

		player.controlBar.volumeControl.addChild(volumeBarsMask);
		volumeBarsMask.addChild(volumeBars);

		// Volume bars mouse position
		var $controlBar = $(player.controlBar.el());
		var $volumeBars = $controlBar.find('.vjs-volume-bars',$(player.b));
		var $volumeBar = $controlBar.find('.volume-bar',$(player.b));
		var noOfBars = $volumeBar.length;
		var width = $volumeBars.width();

		var setBars = function(e){
			$volumeBar.removeClass(htmlClasses.SELECTED);
		};

		var hoverBars = function(e){
			var parentOffset = this.getBoundingClientRect();
			var relX = e.pageX - parentOffset.left;
			var pos = relX/width;
			var currentBar = Math.round(pos*noOfBars);
			$volumeBar.removeClass(htmlClasses.SELECTED);
			$volumeBar.slice(0,currentBar).addClass(htmlClasses.SELECTED);
		};

		var clickEvents = function(e){
			var clicking = false;

			$volumeBars.mousedown(function(e){
				clicking = true;
				var parentOffset = this.getBoundingClientRect();
				var relX = e.pageX - parentOffset.left;
				var pos = relX/width;
				$volumeBar.removeClass(htmlClasses.ACTIVE);
				$volumeBar.slice(0,Math.round(pos*noOfBars)).addClass(htmlClasses.ACTIVE);
				player.volume(Math.round(pos*noOfBars)/5);
			});

			$(document).mouseup(function(){
				clicking = false;
			})

			$volumeBars.mousemove(function(e){
				if(clicking == false) return;
				var parentOffset = this.getBoundingClientRect();
				var relX = e.pageX - parentOffset.left;
				var pos = relX/width;
				$volumeBar.removeClass(htmlClasses.ACTIVE);
				$volumeBar.slice(0,Math.round(pos*noOfBars)).addClass(htmlClasses.ACTIVE);
				player.volume(Math.round(pos*noOfBars)/5);
			});
		}

		// Show volume bars on hover
		var hoverEvents = function() {
			var $controlBar = $(player.controlBar.el());
			var $volume = $controlBar.find('.' + htmlClasses.VOLUME);
			var $mute = $controlBar.find('.' + htmlClasses.MUTE);
			$controlBar.find($mute).hover(function(){
				$controlBar.find($mute).addClass(htmlClasses.HOVER);
				$controlBar.find($volume).addClass(htmlClasses.HOVER);
			}, function() {
				$controlBar.find($mute).removeClass(htmlClasses.HOVER);
				$controlBar.find($volume).removeClass(htmlClasses.HOVER);
			});
			$controlBar.find($volume).hover(function(){
				$controlBar.find($mute).addClass(htmlClasses.HOVER);
				$controlBar.find($volume).addClass(htmlClasses.HOVER);
			}, function(){
				$controlBar.find($mute).removeClass(htmlClasses.HOVER);
				$controlBar.find($volume).removeClass(htmlClasses.HOVER);
			});
		}

		$volumeBars.mouseout(setBars);
		$volumeBars.mousemove(hoverBars);
		hoverEvents();
		clickEvents();
	};

	QtiMediaInteraction.prototype.plugin_keyboardControls = function(options){
		var player = this;

		player.on('play', function(){
			$(window).keyup(function(e){
				if(e.keyCode === 32){
					player.pause();
				}
			});
		});

		player.on('pause', function(){
			$(window).keyup(function(e){
				if(e.keyCode === 32){
					player.play();
				}
			});
		});

		player.on('dblclick', function(e){
			if(!player.isFullscreen()){
				player.requestFullscreen();
			} else {
				player.exitFullscreen();
			}
		});
	};

	QtiMediaInteraction.prototype.plugin_toolTip = function(options){
		var init;
		init = function(){
			var player, $controlBar;
			player = this;
			$controlBar = $(player.controlBar.el());
			$controlBar.find('.' + htmlClasses.PROGRESS).after($('<div class="vjs-tip"><div class="vjs-tip-arrow"></div><div class="vjs-tip-inner"></div></div>'));
			$controlBar.find('.' + htmlClasses.PROGRESS).on('mousemove', function(event){

				var barHeight, minutes, seconds, seekBar, timeInSeconds;
				seekBar = player.controlBar.progressControl.seekBar;

				var offsetLeftProgressBar = this.getBoundingClientRect().left;
				var mousePosition = (event.clientX - offsetLeftProgressBar);

				timeInSeconds = (mousePosition * player.duration()) / seekBar.width();
				if(timeInSeconds === player.duration()){
					timeInSeconds = timeInSeconds - 0.1;
				}
				minutes = Math.floor(timeInSeconds / 60);
				seconds = Math.floor(timeInSeconds - minutes * 60);
				if(seconds < 10){
					seconds = '0' + seconds;
				}
				$controlBar.find('.' + htmlClasses.TOOLTIP_INNER).html('' + minutes + ':' + seconds);
				barHeight = $controlBar.height();
				$controlBar.find('.' + htmlClasses.TOOLTIP).css('left', '' + (event.pageX - offsetLeftProgressBar - 25) + 'px').css('visibility', 'visible');
				return;
			});
			$controlBar.on('mouseout', function() {
				$controlBar.find('.' + htmlClasses.TOOLTIP).css('visibility', 'hidden');
			});
		};
		this.on('loadedmetadata', init);
	};

	QtiMediaInteraction.prototype.plugin_progressHover = function(options){
		var init;
		init = function(){
			var player, $controlBar;
			player = this;
			$controlBar = $(player.controlBar.el());
			$controlBar.find('.' + htmlClasses.PROGRESS).on('mousemove', function(event){
				// var $slider = $controlBar.find('.' + htmlClasses.SLIDER);
				// if($slider.hasClass(htmlClasses.SLIDING)){
					$controlBar.find('.' + htmlClasses.PROGRESS).addClass(htmlClasses.SLIDING);
				// } else {
					// $controlBar.find('.' + htmlClasses.PROGRESS).removeClass(htmlClasses.SLIDING);
				// }
				return;
			});
		};
		this.on('loadedmetadata', init);
	};

	QtiMediaInteraction.prototype.plugin_cuePoints = function(options){
		var conversationItems;

		// == check if there is 'cue-pointed' item
		var root = this.el();
		while (root.parentNode) {
			root = root.parentNode;
			if (root.host){
				if (root.host.parentNode){
					conversationItems = root.host.parentNode.querySelectorAll('li-conversationitem');
				}
			}
		}

		if (conversationItems.length){
			var extend = function(obj) {
				var arg, i, k;
				for (i = 1; i < arguments.length; i++) {
					arg = arguments[i];
					for (k in arg) {
						if (arg.hasOwnProperty(k)) {
							obj[k] = arg[k];
						}
					}
				}
				return obj;
			};

			var defaults = {
				start_time: 0,
				end_time: 3
			};

			var player = this,
				settings = extend({}, defaults, options || {}),
				showingCue = false;

			if (settings.start_time === null) {
				settings.start_time = 0;
			}

			if (settings.end_time === null) {
				settings.end_time = player.duration() + 1;
			}

			//=========================================
			var dialogs = conversationItems;
			var dialog_time = [];
			for (var i = 0; i < dialogs.length; i++) {
				var timeRange = conversationItems[i].attributes['data-cue'].value.split(",");
				dialog_time.push(timeRange);
			}

			var counter_dialog,
				startTimeDialog,
				endTimeDialog,
				oldcuepointSelector,
				oldcuepoint,
				cuepoint;

			var cue = {
				getSelector: function(currentTime){
					var timePlaid = Math.floor(currentTime);
					for(i in dialog_time){
						if( timePlaid < parseInt(dialog_time[i][1], 10) ){
							if(oldcuepoint){
								cue.hideCue(oldcuepoint);
							}
							oldcuepoint = i;
							return [i, dialog_time[i]];
							break;
						}
						
					}
				},
				checkCue: function() {
					counter_dialog = cue.getSelector(player.currentTime())[0];
					startTimeDialog = parseInt( cue.getSelector(player.currentTime())[1][0], 10 );
					endTimeDialog = parseInt(cue.getSelector(player.currentTime())[1][1], 10);
					if ((player.currentTime() >= startTimeDialog) && (player.currentTime() < endTimeDialog) ) {
						cue.showCue();
					}
				},
				showCue: function() {
					cuepoint = conversationItems[counter_dialog].shadowRoot.querySelector(".dialog.cuepoint")
					cuepoint.classList.add('cue');
				},
				hideCue: function(targetId) {
					oldcuepointSelector = conversationItems[targetId].shadowRoot.querySelector(".dialog.cuepoint")
					oldcuepointSelector.classList.remove('cue');
				}
			};

			player.on('timeupdate', cue.checkCue);
		}
	};

	QtiMediaInteraction.prototype.wavesurfer = function(options){
		var _this = this;
		videojs.Waveform = videojs.Component.extend({
			init: function(player, options, ready) {
				videojs.Component.call(this, player, options, ready);
				this.waveReady = false;
				this.msDisplayMax = 1;

				if (this.player().options().autoplay) {
					this.player().bigPlayButton.hide();
				}
				if (this.player().options().controls) {
					this.player().on('userinactive', function(event) {
						 this.player().userActive(true);
					});
					this.player().controlBar.show();
				}

				this.player().controlBar.progressControl.hide();

				this.surfer = Object.create(WaveSurfer);
				this.surfer.on('ready', this.onWaveReady.bind(this));
				this.surfer.on('error', this.onWaveError.bind(this));
				this.surfer.on('finish', this.onWaveFinish.bind(this));
				this.surfer.on('progress', this.onWaveProgress.bind(this));
				this.surfer.on('seek', this.onWaveSeek.bind(this));

				this.player().on('play', this.onPlay.bind(this));
				this.player().on('pause', this.onPause.bind(this));
				this.player().on('volumechange', this.onVolumeChange.bind(this));
				this.player().on('replay', this.onReplay.bind(this));

				this.startPlayers();

				this.surfer.drawer.unAll();
			},

			startPlayers: function() {
				var options = this.options().options;
				this.initialize(options);
				if (options.src != undefined) {
					this.load(options.src);
				}
			},

			initialize: function(opts) {
				opts.container = this.el();
				opts.height = this.player().height() - this.player().controlBar.height();
				this.surfer.init(opts);
			},

			load: function(url) {
				if (url instanceof Blob || url instanceof File) {
					this.surfer.loadArrayBuffer(url);
				} else {
					this.surfer.load(url);
				}
			},

			play: function() {
				this.surfer.play();
			},

			pause: function() {
				this.surfer.pause();
				this.setCurrentTime();
			},

			destroy: function() {
				this.surfer.destroy();
				this.player().dispose();
			},

			setVolume: function(volume) {
				this.surfer.setVolume(volume);
			},

			setCurrentTime: function() {
				var duration = this.surfer.backend.getDuration();
				var currentTime = this.surfer.backend.getCurrentTime()
				var time = Math.min(currentTime, duration);
				this.player().controlBar.currentTimeDisplay.el().children[0].innerHTML = this.formatTime(time, duration);
			},

			setDuration: function() {
				var duration = this.surfer.backend.getDuration();
				this.player().controlBar.durationDisplay.el().children[0].innerHTML = this.formatTime(duration, duration);
			},

			onWaveReady: function() {
				this.waveReady = true;
				this.setDuration();
				if (this.surfer.backend.getDuration() < this.msDisplayMax) {
					this.player().controlBar.durationDisplay.el().style.width =
						this.player().controlBar.currentTimeDisplay.el().style.width = '6em';
				}
				this.player().removeChild(this.player().loadingSpinner);
			},

			onWaveFinish: function() {
				if (!this.player().paused()) {
					if (this.player().options().loop) {
						this.surfer.stop();
						this.play();
					} else {
						this.player().pause();
					}
				}
			},

			onWaveProgress: function(percent) {
				this.setCurrentTime();
			},

			onWaveSeek: function() {
				this.setCurrentTime();
			},

			onPlay: function() {
				if (this.waveReady) {
					this.play();
				}
			},

			onPause: function() {
				this.pause();
			},

			onReplay: function() {
				this.surfer.seekTo(0);
		        this.surfer.drawer.progress(0);
			},

			onVolumeChange: function() {
				var volume = this.player().volume();
				if (this.player().muted()) {
					volume = 0;
				}

				this.setVolume(volume);
			},

			onWaveError: function(error) {
				console.warn(error);
			},

			formatTime: function(seconds, guide) {
				guide = guide || seconds;
				var s = Math.floor(seconds % 60),
					m = Math.floor(seconds / 60 % 60),
					h = Math.floor(seconds / 3600),
					gm = Math.floor(guide / 60 % 60),
					gh = Math.floor(guide / 3600),
					ms = Math.floor((seconds - s) * 1000);

				if (isNaN(seconds) || seconds === Infinity) {
					h = m = s = ms = '-';
				}

				if (guide > 0 && guide < this.msDisplayMax) {
					if (ms < 100) {
						if (ms < 10) {
							ms = '00' + ms;
						} else {
							ms = '0' + ms;
						}
					}
					ms = ":" + ms;
				} else {
					ms = '';
				}

				h = (h > 0 || gh > 0) ? h + ':' : '';
				m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';
				s = ((s < 10) ? '0' + s : s);

				return h + m + s + ms;
			}
		});

		var createWaveform = function() {
			var props = {
				className: 'vjs-waveform',
				tabIndex: 0
			};

			return videojs.Component.prototype.createEl(null, props);
		};

		function wavesurferPlugin(options) {
			this.waveform = new videojs.Waveform(this, {
				'el': createWaveform(),
				'options': options
			});
			this.el().appendChild(this.waveform.el());
		};

		videojs.plugin('wavesurfer', wavesurferPlugin);
		return wavesurferPlugin;
	};

	return QtiMediaInteraction;
})();

Polymer('qti-mediainteraction', QtiMediaInteraction.prototype);