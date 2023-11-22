import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase";
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

/* await setDoc(doc(FIREBASE_DB, "users", "duyngo@gmail.com"), {
    fullname: "Ngo Hoang Duy",
    email: "duyngo@gmail.com",
    favouritedFoods: [],
    lovePosts: [],
});
 */
await setDoc(doc(FIREBASE_DB, "foods", "Phở"), {
    title: "Phở",
    subTitle: "Vietnamese traditional breakfast",
    imageUrlList: [
        "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/1_to_pho_bo_bao_nhieu_calo_9_762e002737.jpg",
    ],
    introduce:
        "Phở nổi tiếng nhất vẫn là phở Hà Nội. Không biết tự bao giờ, phở đã trở thành món ăn vô cùng hấp dẫn mỗi khi đến Hà Nội. Với hương vị độc đáo không có một nơi nào có được, phở Hà Nội đã in sâu vào tiềm thức con người, mặc định nó là món ăn ngon nhất. Muốn ăn phở phải đến Hà Nội. Vào những năm 1940. phở đã rất nổi tiếng ở Hà Nội. Phở là một món ăn có thể ăn vào bất cứ khoảng thời gian nào mà bạn muốn: sáng, trưa, chiều, tối đều được cả. Điểm đặc biệt, món phở không ăn kèm, uống kèm bất cứ thứ gì khác. Một bát phở bao gồm: nước dùng, bánh phở, gia vị ăn kèm như tiêu, hành lá, lát chanh, ớt… Nước dùng của phở có thể được chế biến từ xương bò: xương cục, xương ống và xương vè. Bánh phở phải dai, mềm. Hành lá, ớt, tiêu tăng thêm mùi vị của bát phở. Tùy thuộc vào bí quyết nấu mà mỗi nơi lại có mùi vị của phở khác nhau.",
    ingredientList: [
        "1 kg xương ống bò",
        "800 gram gù bò",
        "80 gram gừng",
        "2 thảo quả",
        "1 gram hạt ngò",
        "5 nụ đinhh hương",
        "Rượu mai quế lộ",
        "Hành tây, đường phèn, hạt nêm, bột ngọt",
        "500 gram bắp bò hoa",
        "Ngò gai, rau quế",
        "2 tai đại hồi",
        "1 nhánh nhỏ quế",
        "1 gram tiểu hồi",
        "1 miếng nhỏ trần bì",
        "10 gram tiêu sọ",
        "Đường cát, muối, giấm, bánh phở",
    ],
    steps: [
        {
            title: "Bước 1: Sơ chế xương bò, bắp bò, gù bò",
            content:
                "Ngâm xương ống với nước muối và giấm khoảng 2 tiếng cho sạch và bớt mùi tanh. Sau đó đem xương đi rửa sạch rồi cho vào nồi nước sôi cùng với gừng và 1 muỗng canh muối đun trong khoảng 10 phút thì vớt ra, trần qua nước lạnh. Cách này sẽ loại bỏ được hoàn toàn mùi hôi bò, giúp nước dùng thơm ngon hơn mà không bị tanh.",
        },
        {
            title: "Bước 2: Hầm xương bò",
            content:
                "Hầm xương ống hơn 10 tiếng với 5 lít nước để xương ra chất, hầm càng lâu, nước dùng sẽ càng thơm ngon và đậm đà hơn. Sau đó đổ nước lạnh vào tùy mức nấu mà bạn mong muốn nhiều hay ít. Tuy nhiên, lượng nước lạnh cho vào sẽ quyết định nước dùng sắc nhiều hay sắc ít.",
        },
        {
            title: "Bước 3: Sơ chế các nguyên liệu khác và nấu nước dùng",
            content:
                "Hành tây một nửa lột vỏ, rửa sạch và cắt lát mỏng, ngâm vào nước lạnh để hành giòn, trắng, bớt nồng. Cho phần hành tây còn lại cùng gừng, sá sùng để nguyên vỏ lên bếp nướng chín thơm (cố gắng không nên để hành, gừng, sá sùng bị cháy quá). Sau đó đem đi lột vỏ và cho gừng, sá sùng, hành tây vào một túi vải trắng, sạch và bỏ vào nồi nước dùng, hầm trong 4 tiếng đồng hồ cho nước ngọt từ nguyên liệu tiết ra hết. Bỏ đại hồi, quế, thảo quả, hạt ngò, đinh hương, tiêu sọ vào chảo rang cho dậy mùi thơm. Chú ý không rang vàng quá sẽ làm đen màu nước dùng. Sau đó đem ngâm với nước sôi tầm 30 phút đến một tiếng cho gia vị ra bớt màu đen và mùi, giúp nước dùng có hương thoang thoảng nhẹ nhàng, không quá nồng gây khó chịu. Sau đó vớt ra, cho hết vào trong túi vải và bỏ vào nồi nước hầm xương. Sau khi hầm hành tây, gừng, sá sùng được 4 tiếng và đại hồi, quế, hạt ngò, đinh hương được 1 tiếng thì vớt cả hai túi ra kèm xương ống. Cho vào nước dùng các gia vị: 60gram đường phèn, 4 muỗng canh muối, 5 muỗng canh hạt nêm, 5 muỗng canh bột ngọt. Nêm nếm thêm bớt gia vị cho vừa miệng.",
        },
        {
            title: "Bước 4: Chuẩn bị bánh phở và các loại rau ăn kèm",
            content:
                "Ngò gai và rau quế rửa sạch và để ráo. Bánh phở trụng sơ với nước sôi, sau đó cho vào tô, xếp thịt bò lên bề mặt, rắc hành lá, rau mùi, hành đã cắt nhỏ, hành tây ngâm nước đá và chan nước dùng. Vắt thêm tí chanh, thêm vào tí ớt là có ngay một tô phở Việt đậm vị truyền thống với công thức gia truyền.",
        },
    ],
    videoLink: "https://youtu.be/WlosNFMCnE4?si=njbzbo9aV08V20WC",
});
