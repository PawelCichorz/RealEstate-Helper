﻿import { jsPDF } from "jspdf"
var font = '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';
export function callAddFont  () {
this.addFileToVFS('popinsregular-normal.ttf', font);
this.addFont('popinsregular-normal.ttf', 'popinsregular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])