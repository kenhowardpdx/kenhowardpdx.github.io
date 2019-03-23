---
date: '2014-07-23'
title: "UNIX Command Line Tips & Tricks"
summary: "I routinely use the following commands in my daily work. They might be helpful to other web developers out there."
---

##Files & Directories
`ls` - Lists files in a given directory.
`la` - Same as above, except this is a link to `ls -la` which shows all files (including hidden files) and their permissions.

**Usage**

```
$ ls ~ //Look in the current users home directory
Applications         Dropbox              Projects Archive
Creative Cloud Files Library              Public
Desktop              Movies               VirtualBox VMs
Documents            Music                bin
Downloads            Pictures             tmp
```

```
$ la /Applications
total 64
-rw-r--r--@  1 ken   admin    21K Jun 12 10:00 .DS_Store
-rw-r--r--   1 root  wheel     0B Aug 25  2013 .localized
drwxrwxrwx   4 root  admin   136B May 27 14:56 Adobe
drwxrwxr-x@  9 root  admin   306B May 19 07:53 Adobe Bridge CS5
drwxr-xr-x@  5 root  admin   170B Jul 16 19:04 Adobe Creative Cloud
drwxrwxr-x@  5 root  admin   170B May 19 07:52 Adobe Device Central CS5
drwxrwxr-x@  8 root  admin   272B May 19 07:51 Adobe Extension Manager CS5
...
```

<br />
##Reading Files
`cat` - Outputs entire contents of a file to the terminal.
`more` / `less` - Outputs the contents of a file to the terminal and breaks it into pages which you can scroll with arrow keys.

**Usage**

```
$ cat README.md
kenhowardpdx-blog
=================

My personal blog about Front-End Web Development and Web Design
```

<br />
##Editing Files
`vim`- As complex as you need it to be. I use it for simple editing.
`echo` - Not really for editing, but you can use it to append to a file (add a new line).

**Usage**

```
$ echo "the string to add" >> myfile.txt
```

For more useful commands, check out Jon de la Motte's [Linux Cheat Sheet](http://www.jondelamotte.com/linux-cheat-sheet/).
