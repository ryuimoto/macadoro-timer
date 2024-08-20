import React from 'react';
import { CircularProgress as MuiCircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomCircularProgress = ({size,progress,strokeWidth,circleOneStroke,circleTwoStroke,timeLeft,activeTask}) => {
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    
    return (
        <svg width={size} height={size}>
            <circle
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                stroke={circleOneStroke}
                opacity="0.2"
            />
            <circle
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                stroke={circleTwoStroke}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
            />
            <text
                x={center}
                y={center - 20}
                fill="white"
                fontSize="30"
                textAnchor="middle"
                fontWeight="bold"
            >
                {timeLeft}
            </text>
            {activeTask && (
                <text
                    x={center}
                    y={center + 20}
                    fill="white"
                    fontSize="20"
                    textAnchor="middle"
                    fontWeight="bold"
                >
                    {activeTask.text} を作業中
                </text>
            )}
        </svg>

      
    );
}

export default CustomCircularProgress;