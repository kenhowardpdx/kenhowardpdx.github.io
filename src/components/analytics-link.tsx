import React, { MouseEvent, ReactEventHandler, SyntheticEvent } from 'react';

interface AnalyticsLinkProps {
  url: string;
  label: string;
  target: string;
  handleClick: (
    eventObj: SyntheticEvent<HTMLAnchorElement, Event>,
    url: string,
    target: string
  ) => void;
}

const AnalyticsLink = ({
  url,
  label,
  target,
  handleClick
}: AnalyticsLinkProps): JSX.Element => (
  <a
    href={url}
    target={target}
    onClick={(eventObj: SyntheticEvent<HTMLAnchorElement, Event>) =>
      handleClick(eventObj, url, target)
    }
  >
    {label}
  </a>
);

const delayNavigation = (
  eventObj: SyntheticEvent<HTMLAnchorElement, Event>,
  url: string,
  target: string,
  timeout = 300
): void => {
  eventObj.preventDefault();
  setTimeout(() => {
    if (target === '_blank') {
      window.open(url);
    } else {
      window.location.href = url;
    }
  }, timeout);
};

AnalyticsLink.defaultProps = {
  handleClick: (eventObj: SyntheticEvent<HTMLAnchorElement, Event>, url: string, target: string): void => {
    // dispatch(actions.analyticsActions.track(eventData));
    delayNavigation(eventObj, url, target);
  },
  target: `_self`
};

export default AnalyticsLink;
