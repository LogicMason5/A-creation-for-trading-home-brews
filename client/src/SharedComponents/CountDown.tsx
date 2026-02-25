/* eslint-disable react/jsx-one-expression-per-line */
import React, { useMemo, useCallback } from 'react';
import Countdown, {
  CountdownRendererFn,
  CountdownRenderProps,
} from 'react-countdown';

interface ExpCountDownProps {
  created: string | number | Date;
  accuracy?: 'hour' | 'minute' | 'second';
  durationDays?: number; // optional flexibility
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;

const CountDown: React.FC<ExpCountDownProps> = ({
  created,
  accuracy = 'minute',
  durationDays = 30,
}) => {
  const expiration = useMemo(() => {
    const baseDate =
      created instanceof Date ? created.getTime() : new Date(created).getTime();

    if (Number.isNaN(baseDate)) {
      console.warn('Invalid created date passed to CountDown');
      return Date.now();
    }

    return baseDate + durationDays * MS_IN_DAY;
  }, [created, durationDays]);

  const countdownFormatter: CountdownRendererFn = useCallback(
    ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
      if (completed) {
        return <span>Expired</span>;
      }

      switch (accuracy) {
        case 'hour':
          return (
            <span>
              {days}d {hours}h
            </span>
          );

        case 'second':
          return (
            <span>
              {days}d {hours}h {minutes}m {seconds}s
            </span>
          );

        case 'minute':
        default:
          return (
            <span>
              {days}d {hours}h {minutes}m
            </span>
          );
      }
    },
    [accuracy]
  );

  return <Countdown date={expiration} renderer={countdownFormatter} />;
};

export default React.memo(CountDown);
