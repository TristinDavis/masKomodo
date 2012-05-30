echo "Remove morefolders.  If it wasn't there than this will error.  Left after build to allow you to inspect contents that was wrapped."
rm -r morefolders
echo "Create the morefolders dir and add chrome and defaults inside."
mkdir -p morefolders/chrome/ && cp -r defaults morefolders/
echo "Copy the chrome.manifest and install.rdf into morefolders"
cp -r *.*f* morefolders/
echo "create morekomodo.jar and move it into morefolder/chrome.  It's removed if you've already got one left in there."
cd chrome
rm morekomodo.jar
zip -r content locale skin
echo "Zip up chrome contents to *.zip, rename to morekomodo.jar, move to morefolders/chrome then get out of this folder."
mv *.zip morekomodo.jar && mv morekomodo.jar ../morefolders/chrome/ && cd ..
echo "morekomodo.jar moved"
echo "create .XPI"
rm moreKomodo-1.8.3.xpi
cd morefolders/ && zip -r chrome defaults chrome.manifest install.rdf
mv *.zip moreKomodo-1.8.3.xpi && mv moreKomodo-1.8.3.xpi ../
echo "done"
