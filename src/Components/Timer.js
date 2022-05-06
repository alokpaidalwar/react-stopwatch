import React from "react";
import { Button,Space } from "antd";

function Timer(props){

    const StartButton = (
        <Button
            type="primary" 
            onClick={props.handleStart}
        >
        Start
        </Button>
    );

    const ActiveButtons = (
        <Space>
            <Button
                onClick={props.handleStop}
            >
                {props.isStop ? "Start": "Stop"}
            </Button>
            <Button 
                type="primary" 
                danger 
                onClick={props.handleReset}
            >
                Reset
            </Button>
        </Space>
    );

    return (
        <div>
            <span className="digits">
                {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits">
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </span>
            <div className="mt">
                {props.active ? ActiveButtons : StartButton}
            </div>
        </div>
    )
}

export default Timer;