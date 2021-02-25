import React from 'react';
import Countdown, { CountdownRendererFn, CountdownRenderProps } from 'react-countdown';

interface ExpCountDownProps {
  created: string;
  accuracy: "hour" | "minute" | "second";
}


const CountDown: React.FC<ExpCountDownProps> = ({ created, accuracy }) => {


  const countdownFormatter: CountdownRendererFn = (props: CountdownRenderProps) => {

    switch (accuracy) {
      case ('minute'):
        return (
          <span>
          Expires in {props.days} days, {props.hours} hours and {props.minutes} minutes
          </span>
        );
    }
  };

  const expiration = Date.parse(created) + (14 * 24 * 60 * 60 * 1000);

  return (
    <span>
      <Countdown
        date={expiration}
        renderer={countdownFormatter}
      />
    </span>
  );
};

export default CountDown;