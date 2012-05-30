#Thats what she said...
@echo on
IF EXIST morefolders RD morefolders /S
MD morefolders\chrome
MD morefolders\defaults
XCOPY defaults morefolders\defaults /E
COPY chrome.manifest morefolders
COPY install.rdf morefolders
CD chrome
7z a -tzip morekomodo.zip content locale skin
REN morekomodo.zip morekomodo.jar
MOVE morekomodo.jar ..\morefolders\chrome
CD ..\morefolders
7z a -tzip moreKomodo-1.8.3.xpi chrome defaults chrome.manifest install.rdf
CD ..
DEL moreKomodo-1.8.3.xpi
MOVE morefolders\moreKomodo-1.8.3.xpi .
