$("#layout").hide();
/** 
 * 上传文件接口
 */
function mergeImg() {
  var formData = new FormData();
  formData.append("file", $("#upload")[0].files[0]);
  $("#layout").show();
  $.ajax({
    type: "POST",
    url: "/file/merge/uploading",
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      console.log(res);
      $("#target")[0].src = "data:image/png;base64," + res.result;
      $("#example").hide();
      $("#layout").hide();
      $("#target").show();
    }
  });
}

function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}




$(".a-upload").on("change", "input[type='file']", function () {
  var filePath = $(this).val();
  var arr = filePath.split('\\');
  var fileName = arr[arr.length - 1];
  $(".showFileName").html(fileName);
  $('.appIcon').attr('src', getObjectURL($(this)[0].files[0]));
  console.log(getObjectURL($(this)[0].files[0]))
  Toast('图片上传成功', 3000)
})

function Toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  var m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 80px;color: rgb(255, 255, 255);line-height: 80px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;border-radius:8px;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 26px;";
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function () {
      document.body.removeChild(m)
    }, d * 1000);
  }, duration);
}