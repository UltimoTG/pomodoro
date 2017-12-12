var React = require("react");
var ReactDOM = require("react-dom");

class Timer extends React.Component {
    constructor() {
        super()

        this.cycleCount = 0

        // set timer to 25 minutes in milliseconds
        this.cycleTimeLeft = 1500000;

        // bind 'this' to custom functions
        this.start = this.start.bind(this)
        this.pause = this.pause.bind(this)
        this.reset = this.reset.bind(this)
        this.tick = this.tick.bind(this)
        this.playSoundAndNotify = this.playSoundAndNotify.bind(this)
        
        // set state
        this.state = {
            cycleTimeLeft: this.cycleTimeLeft,
            breakTimeLeft: 0
        };
    }

    convertToMinutesAndSeconds(milliseconds) {
        var d, h, m, s;
        s = Math.floor(milliseconds / 1000)
        m = Math.floor(s / 60)
        s = s % 60
        m = m % 60

        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        return { m: m, s: s }
    }

    tick() {
        if (this.state.cycleTimeLeft > 0) {
            this.setState({
                cycleTimeLeft: this.state.cycleTimeLeft - 1000
            })
        }
        else {
            this.playSoundAndNotify()
            this.cycleCount = this.cycleCount + 1
            this.pause()
            this.reset()
        }
        
    }

    start() {
        this.timerID = setInterval(this.tick, 1000)
    }

    pause() {
        clearInterval(this.timerID);
    }

    reset() {
        this.setState({
            cycleTimeLeft: this.cycleTimeLeft
        })
    }

    playSoundAndNotify() {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification(
                'Pomodoro', {
                    body: "Work cycle complete."
                }
            );

            notification.onclose = function(){
                console.log('Notification closed')
            }
        }
    }

    render() {
        return (
            <div className="jumbotron">
                <p id="timerCountdown">
                    {this.convertToMinutesAndSeconds(this.state.cycleTimeLeft).m}:{this.convertToMinutesAndSeconds(this.state.cycleTimeLeft).s}
                </p>
                <p>
                    <button className="btn btn-primary btn-small" id="start" onClick={this.start}>Start</button>
                    <button className="btn" id="pause" onClick={this.pause}>Pause</button>
                    <button className="btn" id="reset" onClick={this.reset}>Reset</button>
                </p>
            </div>
        )
    }
}

ReactDOM.render(
    <Timer />,
    document.getElementById('timer')
);