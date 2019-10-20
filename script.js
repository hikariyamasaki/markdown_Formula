function checkFormat(value, source, target){
  if(value.match(source.start)) {
    var preresult = value.replace(source.start, target.start);

    var index = value.indexOf(source.start);
    value = value.slice(index + source.start.length + 1);

    if(preresult.match(source.end)) {
      var result = value.replace(source.end, target.end);
    }

    var preresult = preresult.slice(0, index+target.start.length+1);
    document.getElementById("output").value = preresult + result;
    return preresult + result;
  }
  return false;
}

function transformation(source, target) {
  var inputValue = document.getElementById("input").value ;

  if(!inputValue) {
    alert("値を入力してください");
  } else {
    var value = inputValue;

    const count_max=100;
    for(let i=0; i < count_max; i++){
      value = checkFormat(
        value,
        source,
        target
      );
      if(!value) break;
    }
  }
}

function transform_text(){
  var source_type = document.source.source.value;
  var target_type = document.target.target.value;

  let source = getFormat(source_type);
  let target = getFormat(target_type);

  transformation(source, target);
}

function getFormat(texttype) {
  switch(texttype) {
    case 'qiita':
    return {start: "```math", end:"```"};
    break;
    case 'kibela':
    return {start: "~~~{latex}" , end: "~~~"};
    break;
    case 'hatena':
    return {start: "[tex:", end: "]"};
    break;
  }
}