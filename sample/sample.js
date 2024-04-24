const FAKE_FOOD_LIST = [
  {
    title: 'Bánh mì',
    imageUrl:
      'https://cdn.tgdd.vn/Files/2021/07/27/1371175/huong-dan-3-cach-lam-banh-mi-bo-thom-ngon-de-lam-cho-bua-sang-du-chat-202201041019538628.jpg',
  },
  {
    title: 'Phở',
    imageUrl:
      'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/1_to_pho_bo_bao_nhieu_calo_9_762e002737.jpg',
  },
  {
    title: 'Bún chả',
    imageUrl: 'https://beptruong.edu.vn/wp-content/uploads/2018/05/bun-cha.jpg',
  },
  {
    title: 'Bánh cuốn',
    imageUrl:
      'https://img-global.cpcdn.com/recipes/b235f5db0142062d/1360x964cq70/banh-cu%E1%BB%91n-trang-ch%E1%BA%A3o-nhan-th%E1%BB%8Bt-bam-n%E1%BA%A5m-meo-recipe-main-photo.webp',
  },
  {
    title: 'Gỏi cuốn',
    imageUrl: 'https://themiquanghouse.com/watermark/product/500x300x1/upload/product/goi-4600.jpg',
  },
  {
    title: 'Nem',
    imageUrl: 'https://image.vietnamnews.vn/uploadvnnews/Article/2018/9/17/nem281042039PM.jpg',
  },
  {
    title: 'Bánh Khọt',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/52d3fafee4b03c7eaedee15f/6b5cb0c1-96cc-49e3-85ba-fe4a62ab43d3/EOS+M50_9482.jpg?format=2500w',
  },
  {
    title: 'Bánh Chưng',
    imageUrl: 'https://statics.vinpearl.com/banh-chung-1_1668262682.jpg',
  },
];

const INGREDIENT_LIST = [
  '1 kg xương ống bò',
  '800 gram gù bò',
  '80 gram gừng',
  '2 thảo quả',
  '1 gram hạt ngò',
  '5 nụ đinhh hương',
  'Rượu mai quế lộ',
  'Hành tây, đường phèn, hạt nêm, bột ngọt',
  '500 gram bắp bò hoa',
  'Ngò gai, rau quế',
  '2 tai đại hồi',
  '1 nhánh nhỏ quế',
  '1 gram tiểu hồi',
  '1 miếng nhỏ trần bì',
  '10 gram tiêu sọ',
  'Đường cát, muối, giấm, bánh phở',
];

const STEPS = [
  {
    title: 'Bước 1: Sơ chế xương bò, bắp bò, gù bò',
    content:
      'Ngâm xương ống với nước muối và giấm khoảng 2 tiếng cho sạch và bớt mùi tanh. Sau đó đem xương đi rửa sạch rồi cho vào nồi nước sôi cùng với gừng và 1 muỗng canh muối đun trong khoảng 10 phút thì vớt ra, trần qua nước lạnh. Cách này sẽ loại bỏ được hoàn toàn mùi hôi bò, giúp nước dùng thơm ngon hơn mà không bị tanh.',
  },
  {
    title: 'Bước 2: Hầm xương bò',
    content:
      'Hầm xương ống hơn 10 tiếng với 5 lít nước để xương ra chất, hầm càng lâu, nước dùng sẽ càng thơm ngon và đậm đà hơn. Sau đó đổ nước lạnh vào tùy mức nấu mà bạn mong muốn nhiều hay ít. Tuy nhiên, lượng nước lạnh cho vào sẽ quyết định nước dùng sắc nhiều hay sắc ít.',
  },
  {
    title: 'Bước 3: Sơ chế các nguyên liệu khác và nấu nước dùng',
    content:
      'Hành tây một nửa lột vỏ, rửa sạch và cắt lát mỏng, ngâm vào nước lạnh để hành giòn, trắng, bớt nồng. Cho phần hành tây còn lại cùng gừng, sá sùng để nguyên vỏ lên bếp nướng chín thơm (cố gắng không nên để hành, gừng, sá sùng bị cháy quá). Sau đó đem đi lột vỏ và cho gừng, sá sùng, hành tây vào một túi vải trắng, sạch và bỏ vào nồi nước dùng, hầm trong 4 tiếng đồng hồ cho nước ngọt từ nguyên liệu tiết ra hết. Bỏ đại hồi, quế, thảo quả, hạt ngò, đinh hương, tiêu sọ vào chảo rang cho dậy mùi thơm. Chú ý không rang vàng quá sẽ làm đen màu nước dùng. Sau đó đem ngâm với nước sôi tầm 30 phút đến một tiếng cho gia vị ra bớt màu đen và mùi, giúp nước dùng có hương thoang thoảng nhẹ nhàng, không quá nồng gây khó chịu. Sau đó vớt ra, cho hết vào trong túi vải và bỏ vào nồi nước hầm xương. Sau khi hầm hành tây, gừng, sá sùng được 4 tiếng và đại hồi, quế, hạt ngò, đinh hương được 1 tiếng thì vớt cả hai túi ra kèm xương ống. Cho vào nước dùng các gia vị: 60gram đường phèn, 4 muỗng canh muối, 5 muỗng canh hạt nêm, 5 muỗng canh bột ngọt. Nêm nếm thêm bớt gia vị cho vừa miệng.',
  },
  {
    title: 'Bước 4: Chuẩn bị bánh phở và các loại rau ăn kèm',
    content:
      'Ngò gai và rau quế rửa sạch và để ráo. Bánh phở trụng sơ với nước sôi, sau đó cho vào tô, xếp thịt bò lên bề mặt, rắc hành lá, rau mùi, hành đã cắt nhỏ, hành tây ngâm nước đá và chan nước dùng. Vắt thêm tí chanh, thêm vào tí ớt là có ngay một tô phở Việt đậm vị truyền thống với công thức gia truyền.',
  },
];

const FAVORITE_LIST = [
  {
    title: 'Bánh mì',
    imageUrl:
      'https://cdn.tgdd.vn/Files/2021/07/27/1371175/huong-dan-3-cach-lam-banh-mi-bo-thom-ngon-de-lam-cho-bua-sang-du-chat-202201041019538628.jpg',
  },
  {
    title: 'Phở',
    imageUrl:
      'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/1_to_pho_bo_bao_nhieu_calo_9_762e002737.jpg',
  },
  {
    title: 'Bún chả',
    imageUrl: 'https://beptruong.edu.vn/wp-content/uploads/2018/05/bun-cha.jpg',
  },
  {
    title: 'Bánh cuốn',
    imageUrl:
      'https://img-global.cpcdn.com/recipes/b235f5db0142062d/1360x964cq70/banh-cu%E1%BB%91n-trang-ch%E1%BA%A3o-nhan-th%E1%BB%8Bt-bam-n%E1%BA%A5m-meo-recipe-main-photo.webp',
  },
  {
    title: 'Gỏi cuốn',
    imageUrl: 'https://themiquanghouse.com/watermark/product/500x300x1/upload/product/goi-4600.jpg',
  },
  {
    title: 'Nem',
    imageUrl: 'https://image.vietnamnews.vn/uploadvnnews/Article/2018/9/17/nem281042039PM.jpg',
  },
  {
    title: 'Bánh Khọt',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/52d3fafee4b03c7eaedee15f/6b5cb0c1-96cc-49e3-85ba-fe4a62ab43d3/EOS+M50_9482.jpg?format=2500w',
  },
  {
    title: 'Bánh Chưng',
    imageUrl: 'https://statics.vinpearl.com/banh-chung-1_1668262682.jpg',
  },
];
