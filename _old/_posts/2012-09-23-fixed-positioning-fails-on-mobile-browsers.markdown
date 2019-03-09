---
layout: post
title: Fixed Positioning Fails on Mobile Browsers
summary: Designing a mobile web experience is not the same as designing a mobile app.
---
While re-touching a mobile website, I wanted to simulate a native app having the menu fixed to the top of the screen. While this worked well on my large screen Android phone (4.0, ICS) with [Chrome for Mobile](http://www.google.com/intl/en/chrome/browser/mobile/), the experience was less than stellar on an iOS 5 device running Mobile Safari. In Mobile Safari, the fixed position element scrolls with the page and snaps back into position after the scrolling animation is complete. Brad Frost’s video [explains fixed positioning in the mobile landscape](http://bradfrostweb.com/blog/mobile/fixed-position/). The research here is invaluable. Read his blog post for further details.

As web practitioners, we must take a wider view of the mobile landscape when designing a website. We can’t assume visitors have the latest release of iOS or Android on devices with large screens. If we do, no one benefits.