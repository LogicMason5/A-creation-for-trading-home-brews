/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Countdown, { CountdownRendererFn, CountdownRenderProps } from 'react-countdown';

interface ExpCountDownProps {
  created: string;
  accuracy: 'hour' | 'minute' | 'second';
}

const CountDown: React.FC<ExpCountDownProps> = ({ created, accuracy }) => {
  const countdownFormatter: CountdownRendererFn = (props: CountdownRenderProps) => {
    const { days, hours, minutes } = props;
    const minuteFormat = (
      <span>
        {days} days, {hours} hours and {minutes} minutes
      </span>
    );

    switch (accuracy) {
      case ('minute'):
        return minuteFormat;
      default:
        return minuteFormat;
    }
  };

  const expiration = Date.parse(created) + (30 * 24 * 60 * 60 * 1000);

  return (
    <Countdown
      date={expiration}
      renderer={countdownFormatter}
    />
  );
};

export default CountDown;
