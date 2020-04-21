let search_index = 0;

function checkFormat(value, source, target) {
  let prevalue = value.slice(0, search_index);
  console.log("saerch", search_index);
  value = value.slice(search_index, value.length + 1);
  console.log("value", value);
  if (value.match(source.start)) {
    var preresult = value.replace({
      substr: source.start,
      newSubStr: target.start,
    });
    console.log("preresult", preresult);
    search_index += target.start.length + 1;
    console.log("first", search_index);

    var index = value.indexOf(source.start);

    if (index === -1) {
      return false;
    }

    value = value.slice(index + source.start.length + 1);

    if (preresult.match(source.end)) {
      var result = value.replace(source.end, target.end);
    }
    var preresult = preresult.slice(0, index + target.start.length + 1);
    // カッコの後ろの場所を取得
    search_index += result.indexOf(target.end) + target.end.length + 1;
    console.log("end", search_index);
    document.getElementById("output").value = prevalue + preresult + result;
    return prevalue + preresult + result;
  }
  return false;
}

function transformation(source, target) {
  var inputValue = document.getElementById("input").value;

  if (!inputValue) {
    alert("値を入力してください");
  } else {
    var value = inputValue;

    const count_max = 3;
    for (let i = 0; i < count_max; i++) {
      // debugger;
      value = checkFormat(value, source, target);
      if (!value) break;
    }
  }
}

// 変換ボタンを押すと発火する関数
function transform_text() {
  // （選択式）変換前のテキストのタイプ
  var source_type = document.source.source.value;

  // （選択式）変換後のテキストのタイプ
  var target_type = document.target.target.value;

  let source = getFormat(source_type);
  let target = getFormat(target_type);
  transformation(source, target);
  search_index = 0;
}

function getFormat(texttype) {
  switch (texttype) {
    case "qiita":
      return { start: "```math", end: "```" };
      break;
    case "kibela":
      return { start: "~~~{latex}", end: "~~~" };
      break;
    case "kibelaDollar":
      return { start: "$$", end: "$$" };
      break;
    case "hatena":
      return { start: '<div class="math-render">$$', end: "$$$$</div>" };
      break;
  }
}
