/*
# ***** BEGIN LICENSE BLOCK *****
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Initial Developer of the Original Code is
# Davide Ficano.
# Portions created by the Initial Developer are Copyright (C) 2007
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#   Davide Ficano <davide.ficano@gmail.com>
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****
*/
var prefs = new MoreKomodoPrefs();
var oMinOpenFoundFileCount;
var openFoundFileInfo;
var oRestoreLastFindInFile;
var oMaxRefreshHistoryEntries;
var maxRefreshHistoryEntries;

function OnPreferencePageOK(prefset) {
    var openFoundFileInfo = {
            minFileCount : oMinOpenFoundFileCount.value
    };
    prefs.writeOpenFoundFileInfo(openFoundFileInfo);
    prefs.writeMaxRefreshHistoryEntries(oMaxRefreshHistoryEntries.value);
    prefs.useLastFindContext = oRestoreLastFindInFile.checked;

    return true;
}

function OnPreferencePageInitalize(prefset) {
    oMinOpenFoundFileCount = document.getElementById("minOpenFoundFileCount");
    oMaxRefreshHistoryEntries = document.getElementById("maxRefreshHistoryEntries");
    openFoundFileInfo = prefs.readOpenFoundFileInfo();
    maxRefreshHistoryEntries = prefs.readMaxRefreshHistoryEntries();
    oRestoreLastFindInFile = document.getElementById("restoreLastFindInFile");
}

function OnPreferencePageLoading(prefset) {
    oMinOpenFoundFileCount.value = openFoundFileInfo.minFileCount;
    oMaxRefreshHistoryEntries.value = maxRefreshHistoryEntries;
    oRestoreLastFindInFile.checked = prefs.useLastFindContext;
}

function openFoundFileOnLoad() {
    parent.hPrefWindow.onpageload();

    // RestoreLastFindInFile is implemented in KO6 so isn't necessary to use it
    var isKomodo6 = parseInt(Components.classes["@activestate.com/koInfoService;1"]
                                    .getService().version.split('.', 1)[0]) >= 6;
    if (isKomodo6) {
        document.getElementById('restoreLastFindInFileGroup').setAttribute('hidden', true);
    } else {
        prefs.useLastFindContext = oRestoreLastFindInFile.checked;
    }
}
