/**
 * Created by qinghaibo on 2015/9/24.
 */
function ListResult(totalCount, list) {
    this.errorCode = "success";
    if (totalCount !== undefined) {
        this.totalCount = totalCount;
    }
    if (list !== undefined) {
        this.list = list;
    }
}

function InfoResult(info) {
    this.errorCode = "success";
    if (info !== undefined) {
        this.info = info;
    }
}

function failResult(errorCode) {
    this.errorCode = errorCode || "failure"
}

function ActionResult() {
    this.success = false;
    this.result = {};
}

ActionResult.prototype.successList = function (totalCount, List) {
    this.success = true;
    this.result = new ListResult(totalCount, List);
};

ActionResult.prototype.successInfo = function (info) {
    this.success = true;
    this.result = new InfoResult(info);
};

ActionResult.prototype.failure = function (errorCode) {
    this.success = false;
    this.result = new failResult(errorCode);
};

module.exports = new ActionResult();