var assert 	= require('assert');
var exec 		= require('child_process').exec;
var fs 	 		= require('fs');

describe('validating templates', function() {

	var template = './templates/';

	describe('when validating templates', function() {

		var files = [];

		if (process.env.template) {
			files.push(process.env.template) 
		} else {
			files = fs.readdirSync(template);
		}

		files.forEach(function(test){

			it('should validate template ' + test, function(done){
				var command = './validate/xsdv.sh ./validate/imsqti_v2p1.xsd ' + template + test;
				
				exec(command, function(error, stdout, stderr) {
					// console.log('error', error);
					// console.log('stdout', stdout);
					// console.log('stderr', stderr);
					if (stdout.indexOf('fails to validate') > -1 || stderr.indexOf('Error reading XML source') > -1) {
						console.error(stdout);
						console.error(stderr);
						assert(false);
					} else {
						assert(true);
					}
				  done();
				});
			});
		})
	});
});