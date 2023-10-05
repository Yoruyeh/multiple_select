// select本身
const selectInput = document.querySelector("select");
// select選項們
const selectOptions = Array.from(selectInput.children);
// 表單
const form = document.querySelector("form");
// 按鈕
const submitBtn = document.querySelector("button");

// 被選取的值
let selectedValue = [];

selectInput.addEventListener("click", function handleClick() {
  // Dropdown Menu
  const dropdown = document.querySelector("ul");

  // 第一次點選，選不到Dropdown Menu的ul，開始創造：
  if (!dropdown) {
    // 創造dropdown容器ul
    const dropdown = document.createElement("ul");
    // 創造dropdown內容為li，內有checkbox input，其值取自select input的options
    // 並且用slice()去掉不需要的預設值和最後一個值
    dropdown.innerHTML = selectOptions
      .slice(1, selectOptions.length - 1)
      .map((option) => {
        return `<li><input type="checkbox" id=checkbox_${option.value} value=${option.value} /><label for=checkbox_${option.value}>${option.value}</label></li>`;
      })
      .join("");
    // 將dropdown插入form, button前面
    form.insertBefore(dropdown, submitBtn);

    //  在dropdown放置監聽器，監聽change事件
    dropdown.addEventListener("change", function () {
      // 選取所有的checkbox inputs
      const inputs = document.querySelectorAll("input[type=checkbox]");
      // 用陣列儲存被選取的input值
      const checkedInputs = [];
      // input的checked屬性為true者，推進陣列儲存
      inputs.forEach((input) => {
        if (input.checked) {
          return checkedInputs.push(input.value);
        } else {
          return;
        }
      });
      // 設定選取值等於勾選值
      selectedValue = [...checkedInputs];

      // 選取select button裡的最後一個option
      const hiddenOption = selectInput.lastElementChild;
      // 將最後一個option的value設定為checkedInputs的值
      hiddenOption.value = checkedInputs.toString();
      // 將最後一個option的內文設定為checkedInputs，並用,連結
      hiddenOption.innerHTML = checkedInputs
        .map((option) => {
          return option;
        })
        .join(",");
      // select input的值，會等於hiddenOption的值
      // 即可顯示用戶選取的多選值在select input上
      selectInput.value = hiddenOption.value;
    });
    return;
  }

  // 點選select按鈕可以開啟或關閉dropdown，用hidden這個class做顯示控制
  if (dropdown && dropdown.classList.contains("hidden")) {
    dropdown.classList.remove("hidden");
  } else {
    dropdown.classList.add("hidden");
  }
});

document.addEventListener("mousedown", function clickOutSide(e) {
  const dropdown = document.querySelector("ul");
  // 點選的target如果不是在dropdown或select input內，就關閉dropdown
  if (
    dropdown &&
    !dropdown.contains(e.target) &&
    !selectInput.contains(e.target)
  ) {
    dropdown.classList.add("hidden");
  }
});

form.addEventListener("submit", function handleSubmit(e) {
  // 防止預設行為
  e.preventDefault();
  // 印出被選擇的值
  console.log(selectedValue);
});
