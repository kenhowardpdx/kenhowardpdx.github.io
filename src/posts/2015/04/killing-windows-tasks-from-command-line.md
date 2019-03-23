---
date: '2015-04-21'
title: "Killing Windows Tasks from the Command Line"
summary: "Working in Visual Studio and using Task Runner Explorer makes running gulp tasks within the IDE super convenient. But when Visual Studio crashes (all too often) and your watch task is still running in the background, you need a way to stop the process so you can start it again or run other gulp tasks."
path: 2015-04-21-killing-windows-tasks-from-command-line.md
---

Use this simple command from the [Command Prompt](http://en.wikipedia.org/wiki/Cmd.exe):

```
C:\>taskkill /im node.exe /f
```

This will look for any node process and kill it. Continue developing sweet code.
