const hendelChatogory = async () => {
    const responce = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await responce.json();
    const chatogoryData = data.data.news_category;

    const topThree = chatogoryData.slice(0, 3)


    const tabContainer = document.getElementById('tab-container')

    topThree.forEach(chatogory => {
        const div = document.createElement('div');
        div.innerHTML =
            `
<a class="tab" onclick='singleNews("${chatogory.category_id}")'>${chatogory.category_name}</a>
`
        tabContainer.appendChild(div);
    });


    // console.log(topThree)
}


const singleNews = async (chatogoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${chatogoryId}`);
    const data = await res.json();
    const singleNewsData = data.data;

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''
    singleNewsData?.forEach((news) => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML =
            `
        <figure>
            <img src=${news?.image_url}/>
          </figure>
          <div class="card-body">
            <h2 class="card-title">
             ${news?.title}
              <div class="badge badge-secondary p-5">${news?.rating?.badge
            }</div>
            </h2>
            <p>
              ${news?.details.slice(0, 50)}
            </p>
            <div class="card-footer flex justify-between mt-8">
              <div class="flex">
                <div>
                  <div class="avatar online">
                    <div class="w-14 rounded-full">
                      <img
                        ${news.author?.img}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h6>${news?.author?.name}</h6>
                  <small> ${news?.author?.published_date}
                  </small>
                </div>
              </div>
              <div class="card-detaild-btn">
                <button onclick=modalHandel('${news?._id}')
                  class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        `

        cardContainer.appendChild(cardDiv)
    })

    console.log(singleNewsData)
}

const modalHandel = async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const dataNews = await res.json();

    console.log(dataNews.data)
    const modal = document.getElementById('modal-handel')

    const modalDiv = document.createElement('div');
    modalDiv.innerHTML =
        `
    
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
                    <img
                        src=${dataNews.data?.[0].image_url}
                      />
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
    `
    modal.appendChild(modalDiv)

    const modalShow = document.getElementById('my_modal_1')
    modalShow.showModal()

}


hendelChatogory()

singleNews('03')