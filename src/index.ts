//  https://71944ab7aed98450.mokky.dev/marka
let table = document.getElementById("table") as HTMLTableElement;
let markaSidebar = document.querySelector(
  ".marka-sidebar"
) as HTMLAnchorElement;
let shartnomaSidebar = document.querySelector(
  ".mashina-sidebar"
) as HTMLAnchorElement;
let selectDiv = document.querySelector("#select") as HTMLDivElement;
type Mashina = {
  markaId: number;
  id: number;
  color: string;
  date: string;
  customer: string;
};
type Marka = {
  id: number;
  img: string;
  car: string;
};
async function markalar() {
  selectDiv.innerHTML = "";
  shartnomaSidebar.classList.remove("active");
  markaSidebar.classList.add("active");
  try {
    //@ts-ignore
    const response = await axios.get(
      "https://71944ab7aed98450.mokky.dev/marka"
    );
    console.log("test res", response.data);
    table.innerHTML = "";
    let thead = document.createElement("thead") as HTMLTableSectionElement;
    let tbody = document.createElement("tbody") as HTMLTableSectionElement;
    let trh = document.createElement("tr");
    trh.innerHTML = `
                  <th scope="col">Car's image</th>
                  <th scope="col">Car's name</th>
                  <th scope="col"> edit/delate</th>
                `;
    let th = document.createElement("th");
    th.setAttribute("scope", "col");
    let plusBtn = document.createElement("button");
    plusBtn.className = "btn";
    plusBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    th.appendChild(plusBtn);
    trh.appendChild(th);
    thead.appendChild(trh);
    response.data.map((marka: Marka) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
                    <td style="height=75px"> <img src="${marka.img}" alt="" width="80px" "height=50px" > </td>
                    <td style="height=75px"> ${marka.car} </td>
                    `;
      tr.className = "align-middle";
      let td = document.createElement("td");
      td.className = "d-flex gap-2 align-middle ";
      td.style.height = "75px";
      let button1 = document.createElement("button");
      let button2 = document.createElement("button");
      button1.className = "btn edit";
      button2.className = "btn delete";
      button1.innerHTML = `  <i class="fa fa-pencil" aria-hidden="true"></i>`;
      button2.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      table.appendChild(thead);
      td.appendChild(button1);
      td.appendChild(button2);
      tr.appendChild(td);
      tbody.appendChild(tr);
      table.appendChild(tbody);
      button2.addEventListener("click", async () => {
        console.log("test delete marka");
        try {
          await deleteMarka(marka.id);
        } catch (error) {
          console.log(error);
        }
      });

      button1.setAttribute("data-bs-toggle", "modal");
      button1.setAttribute("data-bs-target", "#editMarka");
      // edit
      button1.addEventListener("click", async () => {
        console.log("test edit marka ");
        let imgEdit = document.querySelector("#img") as HTMLInputElement;
        let nomiEdit = document.querySelector("#nomi") as HTMLInputElement;
        imgEdit.value = marka.img;
        nomiEdit.value = marka.car;

        let footerMarkaEdit = document.querySelector(
          "#footer-edit-marka"
        ) as HTMLDivElement;
        let backMarkaEdit = document.createElement(
          "button"
        ) as HTMLButtonElement;
        backMarkaEdit.innerHTML = "Orqaga";
        backMarkaEdit.className = "btn btn-secondary";
        backMarkaEdit.setAttribute("data-bs-dismiss", "modal");
        let saveinfoMarkaEdit = document.createElement(
          "button"
        ) as HTMLButtonElement;
        saveinfoMarkaEdit.innerHTML = "Saqlash";
        saveinfoMarkaEdit.className = "btn btn-primary";
        footerMarkaEdit.innerHTML = "";
        footerMarkaEdit.appendChild(backMarkaEdit);
        footerMarkaEdit.appendChild(saveinfoMarkaEdit);
        saveinfoMarkaEdit.addEventListener("click", async () => {
          console.log("edit marka save");

          try {
            //@ts-ignore
            await axios.patch(
              `https://71944ab7aed98450.mokky.dev/marka/${marka.id}`,
              {
                img: imgEdit.value,
                car: nomiEdit.value,
              }
            );
            console.log("test2");
            markalar();
          } catch (error) {
            console.log("ozgartirish kiritilmadi", error);
          }
        });
      });

      // add
      plusBtn.setAttribute("data-bs-toggle", "modal");
      plusBtn.setAttribute("data-bs-target", "#addMarka");
      plusBtn.addEventListener("click", () => {
        let foot = document.querySelector(
          "#footer-add-marka"
        ) as HTMLDivElement;
        let backAdd = document.createElement("button") as HTMLButtonElement;
        backAdd.innerHTML = "orqaga";
        backAdd.className = "btn btn-secondary";
        backAdd.setAttribute("data-bs-dismiss", "modal");
        let saveAdd = document.createElement("button") as HTMLButtonElement;
        saveAdd.innerHTML = "Marka qo'shish";
        saveAdd.className = "btn btn-primary";
        foot.innerHTML = "";
        foot.appendChild(backAdd);
        foot.appendChild(saveAdd);

        saveAdd.addEventListener("click", async () => {
          console.log("marka add ");
          try {
            const imgAdd = document.getElementById(
              "imgmarka"
            ) as HTMLInputElement;
            const carAdd = document.getElementById(
              "nomimarka"
            ) as HTMLInputElement;
            //@ts-ignore
            await axios.post(`https://71944ab7aed98450.mokky.dev/marka`, {
              img: imgAdd.value,
              car: carAdd.value,
            });
            imgAdd.value = "";
            carAdd.value = "";
            markalar();
          } catch (error) {
            console.log("ozgartirish kiritilmadi", error);
          }
        });
      });
    });
  } catch (error) {
    console.log("error marka()", error);
  }
}

async function mashinalar() {
  markaSidebar.classList.remove("active");
  shartnomaSidebar.classList.add("active");

  let select = document.createElement("select");
  select.className = "form-select";
  const option1 = document.createElement("option");
  option1.value = `6`;
  option1.text = `Barchasi`;
  select.appendChild(option1);
  // @ts-ignore
  const response = await axios.get("https://71944ab7aed98450.mokky.dev/marka");
  response.data.map((marka: Marka) => {
    const option = document.createElement("option");
    option.value = `${marka.id}`;
    option.text = `${marka.car}`;
    select.appendChild(option);
  });

  let button = document.createElement("button") as HTMLButtonElement;
  button.className = "btn";
  button.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#exampleModal");
  selectDiv.innerHTML = "";
  selectDiv.appendChild(select);
  selectDiv.appendChild(button);

  select.addEventListener("change", async () => {
    // console.log(typeof select.value);
    try {
      console.log("salom");
      if (select.value == option1.value) {
        mashinalar();
      } else {
        // @ts-ignore
        const response = await axios.get(
          `https://71944ab7aed98450.mokky.dev/shartnoma?markaId=${Number(
            select.value
          )}`
        );
        console.log("select test res", response.data);
        table.innerHTML = "";
        let thead = document.createElement("thead") as HTMLTableSectionElement;
        let tbody = document.createElement("tbody") as HTMLTableSectionElement;

        thead.innerHTML = `  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Costumer Name's</th>
                    <th scope="col">Marka id</th>
                    <th scope="col">Car's color</th>
                    <th scope="col">Date</th>
                    <th scope="col">Edit/Delate</th>
                  </tr>`;
        response.data.map((mashina: Mashina, index: number) => {
          let tr = document.createElement("tr");
          let td = document.createElement("td");
          td.className = "d-flex gap-2";
          let button1 = document.createElement("button");
          let button2 = document.createElement("button");
          button1.className = "btn edit";
          button2.className = "btn delete";
          button1.innerHTML = ` <i class="fa fa-pencil" aria-hidden="true"></i>`;
          button2.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;

          tr.innerHTML = ` <td> ${index + 1}</td>
                        <td> ${mashina.customer}</td>
                        <td>${mashina.markaId}</td>
                        <td>${mashina.color}</td>
                        <td>${mashina.date}</td>
                       
                       `;
          table.appendChild(thead);
          td.appendChild(button1);
          td.appendChild(button2);
          tr.appendChild(td);
          tbody.appendChild(tr);
          table.appendChild(tbody);

          button2.addEventListener("click", async () => {
            console.log("test ");
            try {
              await deleteMashina(mashina.id);
              mashinalar();
            } catch (error) {}
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  try {
    //@ts-ignore
    const response = await axios.get(
      `https://71944ab7aed98450.mokky.dev/shartnoma`
    );
    console.log("test res", response.data);
    table.innerHTML = "";
    let thead = document.createElement("thead") as HTMLTableSectionElement;
    let tbody = document.createElement("tbody") as HTMLTableSectionElement;

    thead.innerHTML = `  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Customer's name</th>
                    <th scope="col">Marka id</th>
                    <th scope="col">Car's color</th>
                    <th scope="col">Date</th>
                    <th scope="col">Edit/Delate</th>
                  </tr>`;
    response.data.map((mashina: Mashina, index: number) => {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.className = "d-flex gap-2";
      let button1 = document.createElement("button");
      let button2 = document.createElement("button");
      button1.className = "btn edit";
      button2.className = "btn delete";
      button1.innerHTML = `<i class="fa fa-pen" aria-hidden="true"></i>`;
      button2.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;

      tr.innerHTML = ` <td> ${index + 1}</td>
                                  <td> ${mashina.customer}</td>
                                  <td>${mashina.markaId}</td>
                                  <td>${mashina.color}</td>
                                  <td>${mashina.date}</td>
                                 
                                 `;
      table.appendChild(thead);
      td.appendChild(button1);
      td.appendChild(button2);
      tr.appendChild(td);
      tbody.appendChild(tr);
      table.appendChild(tbody);

      button2.addEventListener("click", async () => {
        console.log("test ");
        try {
          await deleteMashina(mashina.id);
          mashinalar();
        } catch (error) {}
      });
      // edit
      button1.setAttribute("data-bs-toggle", "modal");
      button1.setAttribute("data-bs-target", "#exampleModaledit");
      button1.addEventListener("click", () => {
        const xaridor = document.getElementById(
          "customerEdit"
        ) as HTMLInputElement;
        const rang = document.getElementById("colorEdit") as HTMLInputElement;
        const sana = document.getElementById("dateEdit") as HTMLInputElement;
        const markaid = document.querySelector(
          "#markaEdit"
        ) as HTMLInputElement;
        console.log("button edit");

        let footerMashinaEdit = document.querySelector(
          "#footer-modaledit"
        ) as HTMLDivElement;
        let orqagaMashinaEdit = document.createElement(
          "button"
        ) as HTMLButtonElement;
        orqagaMashinaEdit.innerHTML = "Orqaga";
        orqagaMashinaEdit.className = "btn btn-secondary";
        orqagaMashinaEdit.setAttribute("data-bs-dismiss", "modal");
        let savecarEdit = document.createElement("button") as HTMLButtonElement;
        // console.log("markaid0", markaid.value);
        savecarEdit.innerHTML = "Saqlash";
        savecarEdit.className = "btn btn-primary";
        footerMashinaEdit.innerHTML = "";
        footerMashinaEdit.appendChild(orqagaMashinaEdit);
        footerMashinaEdit.appendChild(savecarEdit);
        xaridor.value = mashina.customer;
        rang.value = mashina.color;
        sana.value = mashina.date;
        //@ts-ignore
        markaid.value = mashina.markaId;
        savecarEdit.addEventListener("click", async () => {
          try {
            //@ts-ignore
            await axios.patch(
              `https://71944ab7aed98450.mokky.dev/shartnoma/${mashina.id}`,
              {
                customer: xaridor.value,
                color: rang.value,
                date: sana.value,
                markaId: markaid.value,
              }
            );
            mashinalar();
          } catch (error) {
            console.log(error);
          }
        });
      });

      // add
      button.setAttribute("data-bs-toggle", "modal");
      button.setAttribute("data-bs-target", "#exampleModal");
      button.addEventListener("click", () => {
        let foot = document.querySelector(
          "#footer-add-modal"
        ) as HTMLDivElement;
        let backAdd = document.createElement("button") as HTMLButtonElement;
        backAdd.innerHTML = "orqaga";
        backAdd.className = "btn btn-secondary";
        backAdd.setAttribute("data-bs-dismiss", "modal");
        let saveadd = document.createElement("button") as HTMLButtonElement;
        saveadd.innerHTML = "mashinalar qoshish";
        saveadd.className = "btn btn-primary";
        foot.innerHTML = "";
        foot.appendChild(backAdd);
        foot.appendChild(saveadd);

        saveadd.addEventListener("click", async () => {
          console.log("mashina add ");
          try {
            const xaridoradd = document.getElementById(
              "customer"
            ) as HTMLInputElement;
            const rangadd = document.getElementById(
              "color"
            ) as HTMLInputElement;
            const sanaadd = document.getElementById("date") as HTMLInputElement;
            const markaIDadd = document.getElementById(
              "markaID"
            ) as HTMLInputElement;
            //@ts-ignore
            await axios.post(`https://71944ab7aed98450.mokky.dev/shartnoma`, {
              customer: xaridoradd.value,
              date: sanaadd.value,
              color: rangadd.value,
              markaId: markaIDadd.value,
            });
            mashinalar();
            // //@ts-ignore
            // Toastify({
            //   text: "edit qilishda xatolik mavjud",
            //   duration: 2000,
            //   style: {
            //     background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            //     borderRadius: "10px",
            //   },
            // }).showToast();
          } catch (error) {
            console.log("ozgartirish kiritilmadi", error);
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteMarka(id: number) {
  console.log("delete marka");
  try {
    //@ts-ignore
    await axios.delete(`https://71944ab7aed98450.mokky.dev/marka/${id}`);
    markalar();
  } catch (error) {
    console.error(error);
  }
}
async function deleteMashina(id: number) {
  console.log("delete mashina");
  try {
    //@ts-ignore
    await axios.delete(`https://71944ab7aed98450.mokky.dev/shartnoma/${id}`);
    mashinalar();
  } catch (error) {
    console.error(error);
  }
}

window.onload = () => {
  markalar();
};

markaSidebar?.addEventListener("click", markalar);
shartnomaSidebar?.addEventListener("click", mashinalar);
