import React, {useEffect, useState} from "react";
import {Row, Col} from "antd";
import Timer from "./Timer";
import {createLog, getLogs} from "../Service/log";
import LogTable from "./LogTable";

function StopWatch(){

    const [isActive, setIsActive] = useState(false);
    const [isStop, setIsStop] = useState(true);
    const [time, setTime] = useState(0);
    const [dataSource, setDataSource] = useState();
    const [current, setCurrent] = useState();
    const perPage = 10;

    useEffect(() => {
        let interval = null;
    
        if (isActive && isStop === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isStop]);

    useEffect(()=>{
        getTableData(1)
    },[])
    
    const handleStart = () => {
        createLog({'buttonType': 'Start', 'log': 'Start button clicked'}).then(()=> {
            getTableData(1);
            setCurrent(1);
        });
        setIsActive(true);
        setIsStop(false);
    };
    
    const handleStop = () => {
        isStop ? 
            createLog({'buttonType': 'Start', 'log': `Start button clicked with duration ${time} ms`}).then(()=> {
            getTableData(1)
            setCurrent(1);
        })
        :   createLog({'buttonType': 'Stop', 'log': `Stop button clicked with duration ${time} ms`}).then(()=> {
            getTableData(1)
            setCurrent(1);
        });
        setIsStop(!isStop);
        getLogs({'page':1,'perPage':perPage}).then((response)=>{
            setDataSource(response.logs)
        });
    };
    
    const handleReset = () => {
        createLog({'buttonType': 'Reset', 'log': 'Reset button clicked'}).then(()=> {
            getTableData(1)
            setCurrent(1);
        });
        setIsActive(false);
        setTime(0);
    };

    const getTableData = (current) => {
        getLogs({'page': current,'perPage': perPage}).then((response)=>{
            setDataSource(response.logs)
        });
        setCurrent(current);
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                   <h1>StopWatch</h1> 
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Timer
                    time={time}
                    active={isActive}
                    isStop={isStop}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    handleReset={handleReset}
                />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={20} className="mt">
                   <LogTable 
                        dataSource={dataSource?.data}
                        total={dataSource?.documents}
                        perPage={dataSource?.perPage}
                        getTableData={getTableData}
                        current={current}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default StopWatch;