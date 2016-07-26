var worker;

var rrbz = (function( w, undefined ) {

    function play() {
        // get a new date object
        now = new Date();
        // get the current minute count
        min = now.getMinutes();

        // if at the top of the hour
        if ( min === 0 ) {
            // play the alma mater
            document.getElementById('alma_mater').play();
        }
    }


    function updateClock () {
        var currentTime = new Date ();

        var currentHours = currentTime.getHours ();
        var currentMinutes = currentTime.getMinutes ();

        // pad the minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

        // choose either "AM" or "PM" as appropriate
        var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

        // convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

        // convert an hours component of "0" to "12"
        currentHours = ( currentHours == 0 ) ? 12 : currentHours;

        // compose the string for display
        var currentTimeString = currentHours + ":" + currentMinutes + "<span class='ampm'>" + timeOfDay + '</span>';

        // update the time display
        document.getElementById("clock").innerHTML = currentTimeString;
    }

    // set up web worker
    function initWebWorker() {

        worker = new Worker("worker.js");

        // post a message to the web worker
        worker.postMessage('play');
        worker.postMessage('updateClock');

        worker.addEventListener('message', function(e) {
            switch (e.data) {
                case 'firePlay':
                    play();
                    break;
                case 'fireUpdateClock':
                    updateClock();
                    break;
            };
        }, false);

    }

    function aboutMe() {
        console.info('You like TCU and web development too? Awesome! I spent about ten minutes on this, let me know if you want to make it better.');
        console.info('https://github.com/jasonlcrane/rrbz');
    }

    return {
        init: function() {
            // start the clock
            updateClock();

            // check minutes and play if it's time
            play();

            // start the web worker process
            initWebWorker();

            // tell people looking in console who I am
            aboutMe();
        }
    }


} ( window ) );

// initialize the pcvx object
rrbz.init();