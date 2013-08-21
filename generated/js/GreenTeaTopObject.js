// ***************************************************************************
// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// *  Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// *  Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// **************************************************************************
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GreenTeaTopObject = (function () {
    function GreenTeaTopObject(GreenType) {
        this.GreenType = GreenType;
    }
    return GreenTeaTopObject;
})();

var GreenTeaAnyObject = (function (_super) {
    __extends(GreenTeaAnyObject, _super);
    function GreenTeaAnyObject(GreenType, NativeValue) {
        _super.call(this, GreenType);
        this.NativeValue = NativeValue;
    }
    return GreenTeaAnyObject;
})(GreenTeaTopObject);

var GreenTeaArray = (function (_super) {
    __extends(GreenTeaArray, _super);
    function GreenTeaArray(GreenType) {
        _super.call(this, GreenType);
    }
    return GreenTeaArray;
})(GreenTeaTopObject);

var GreenTeaEnum = (function (_super) {
    __extends(GreenTeaEnum, _super);
    function GreenTeaEnum(GreenType, EnumValue, EnumSymbol) {
        _super.call(this, GreenType);
        this.EnumValue = EnumValue;
        this.EnumSymbol = EnumSymbol;
    }
    return GreenTeaEnum;
})(GreenTeaTopObject);
