/**
 * Created by Administrator on 2017/4/17.
 */
function CreateImage(){
    this.view = $(ViewAllGroup.detailMemberInfo);
    this.imgView = this.view.find("[sid=mb-de-info-img]");
    this.nameView = this.view.find("[sid=mb-de-info-name]");
    var photoPathTotal = [];

    for (var i = 0; i < this.groupdata.length; i++) {
        this.nameView.text(this.groupdata[i].realName);
        var that = this;
        var photoPath = that.groupdata[i].photo;
        photoPath += "&timestamp=" + new Date().getTime();
        photoPathTotal.push(photoPath);
        console.log(that.parentView.find('img'));
        (function (i) {
            var image = new Image();
            image.onload = function () {
                $(that.parentView.find('img')[i]).attr("src", photoPathTotal[i]);
            };
            image.src = photoPathTotal[i];
            image.onerror = function () {
                console.log(photoPathTotal[i]);
                console.log("Í¼Æ¬¼ÓÔØÊ§°Ü!");
            };

        })(i);
        this.parentView.append(this.view.clone());
    }
};