import React from "react";

const CircularProgress = ({size,progress,strokeWidth,circleOneStroke,circleTwoStroke,children,timeLeft,activeTask}) => {
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
            y={center - 20} // 調整して中心から上に少し移動
            fill="white"
            fontSize="30" // フォントサイズ
            textAnchor="middle"
            fontWeight="bold"
          >
            {timeLeft}
          </text>
          {activeTask && (
            <text
              x={center}
              y={center + 20} // 中心から下に少し移動
              fill="white"
              fontSize="20" // フォントサイズ
              textAnchor="middle"
              fontWeight="bold"
            >
              {activeTask.text} を作業中
            </text>
          )}
        </svg>
      );
};

export default CircularProgress;