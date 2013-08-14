/// <reference path="LangDeps.ts" />
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
