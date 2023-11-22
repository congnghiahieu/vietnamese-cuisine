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
await setDoc(doc(FIREBASE_DB, "foods", "Bánh cuốn"), {
    title: "Bánh cuốn",
    subTitle: "Vietnamese traditional dish",
    imageUrlList: [
        "https://cdn.jamja.vn/blog/wp-content/uploads/2017/07/B%C3%A1nh-cu%E1%BB%91n-2.jpg",
        "https://cdn.jamja.vn/blog/wp-content/uploads/2017/07/B%C3%A1nh-cu%E1%BB%91n-3.jpg",
        "https://cdn3.ivivu.com/2022/09/B%C3%A1nh-cu%E1%BB%91n-Thanh-Tr%C3%AC-ivivu-1.jpg",
        "https://cdn3.ivivu.com/2022/09/b%C3%A1nh-cu%E1%BB%91n3.jpg",
        "https://cdn3.ivivu.com/2022/09/B%C3%A1nh-cu%E1%BB%91n-Thanh-Tr%C3%AC-ivivu-5.jpg",
    ],

    introduce:
        "Bên cạnh những món ăn sáng mang đậm đặc trưng của người Việt như phở, bún chả, bún riêu,.. thì bánh cuốn được coi như một thức quà ăn sáng mát lành mà lại cực kì bổ dưỡng, thích hợp cho những ngày hè nóng nực muốn tìm kiếm món ăn thanh mát. Bánh cuốn được biết đến như một loại bánh được làm từ bột gạo hấp, cán mỏng rồi sau đó cuộn với nhân gồm thịt, mộc nhĩ, nấm hương thái nhỏ, được rắc bên trên một chút hành khô, ăn kèm với nước chấm chua ngọt đúng điệu. Thật không khó để bắt gặp những hàng quán bánh cuốn trên đường phố Hà Nội bởi bánh cuốn được không chỉ người Việt yêu thích mà hương vị thơm ngon của chúng còn thu hút những vị khách nước ngoài. Chỉ cần thưởng thức là sẽ không bao giờ có thể quên được",
    ingredientList: [
        "200gr bột gạo",
        "200gr bột năng",
        "250gr thịt băm (không quá nhuyễn)",
        "Dầu ăn",
        "Mộc nhĩ",
        "Nấm hương",
        "Hành tây",
        "Hành củ",
        "Gia vị: mắm, muối, hạt nêm",
        "Nước lạnh",
    ],
    steps: [
        {
            title: "Bước 1: Chế biến phần nhân bánh",
            content:
                "Đầu tiên, bạn ngâm nấm hương, mộc nhĩ với một chút nước ấm để chúng nở đều và mềm hơn. Hành tây bóc vỏ rồi sau đó thái nhỏ, gần như là băm nhuyễn. Mộc nhĩ nấm hương vớt ra rồi sau đó cũng thái nhỏ tương tự. Đối với hành củ, bạn thái nhỏ thành từng lát mỏng rồi sau đó cho lên chảo phi thơm với một chút dầu ăn, sau đó để riêng vào một đĩa có lớp giấy thấm dầu sẵn. Ướp thịt băm với hạt nêm, muối, nước mắm, để nguyên tầm 2 đến 5 phút để thịt được ngấm. Lưu ý ướp hơi nhạt một chút để khi xào chung với các nguyên liệu khác sẽ không bị mặn. Bạn có thể đảo riêng thịt băm cho săn lại. Bắc chảo lên rồi để lửa vừa, cho dầu ăn rồi sau đó cho hành tây đã thái nhỏ vào phi thơm, sau đó đổ phần thịt băm, mộc nhĩ, nấm hương vào đảo chung tầm 35 giây rồi tắt bếp. Trong lúc đảo bạn có thể tăng giảm gia vị cho phần nhân được vừa vặn.",
        },
        {
            title: "Bước 2: Pha bột bánh và làm phần bánh tráng",
            content:
                "Nếu bạn nào muốn thử sức với cách pha bột truyền thống thì chỉ đơn giản pha nguyên liệu bột gạo với bột năng có sẵn, tùy theo chất bánh bạn muốn dai hay mềm mà pha theo tỷ lệ. Với chất bánh dai thì pha bột năng với bột gạo theo tỉ lệ 1:2 còn muốn bánh mềm một chút thì pha bột năng với bột gạo theo tỉ lệ 1:3. Rồi sau đó pha hỗn hợp bột đã trộn với 1 lít nước lọc, cho thêm 1 thìa cà phê muối, 1 thìa cà phê dầu ăn rồi sau đỏ ủ bột khoảng 1 đến 2 tiếng đồng hồ.",
        },
        {
            title: "Bước 3: Tráng và cuốn bánh",
            content:
                "Bắc chảo lên rồi để lửa thật nhỏ, rồi dùng bông đã nhúng dầu rồi phết đều lên bề mặt chảo đã được làm nóng. Nhanh tay đổ một lượng bột bánh nhất định rồi sau đó đảo chảo để bánh được tràn đều mặt rồi đậy nắp chảo tầm 2o giây. Sau đó úp ngược chảo vào một chiếc thớt rộng để tiến hành cuộn nhân. Vì là bánh cuốn nên tráng đến đâu cuốn đến đó để tránh cho phần bánh bị chín và cứng. Sau khi để bánh lên thớt, nhanh tay cuộn nhân thành từng cuộn thuôn dài vừa ăn rồi bày dần lên đĩa.",
        },
        {
            title: "Bước 4: Pha chế nước chấm",
            content:
                "1 muỗng canh đường, 1 muỗng canh nước mắm, 1 muống nước cốt chanh (bạn có thể thay thế bằng dấm ăn cũng được) rồi sau đó khuấy đều tất cả các nguyên liệu trên. Tăng giảm lượng cho phù hợp với khẩu vị của bạn. Rồi sau đó cho tỏi băm, ớt băm và đu đủ đã thái lát để nước chấm được thơm ngon và tròn vị hơn.",
        },
    ],
    videoLink: "https://youtu.be/ap5PAydQay8?si=wdiOl-UVX6PtWinW",
});

await setDoc(doc(FIREBASE_DB, "foods", "Bánh chưng"), {
    title: "Bánh chưng",
    subTitle: "The soul of Vietnamese Tet Holiday ",
    imageUrlList: [
        "https://statics.vinpearl.com/banh-chung-1_1668262682.jpg",
        "https://statics.vinpearl.com/banh-chung-3_1668262666.jpg",
        "https://cdn.tgdd.vn/2020/08/CookProduct/37-1200x676.jpg",
        "https://cdn.tgdd.vn/Files/2015/01/31/605299/cach-lam-banh-chung-cho-ngay-tet-2-1.jpg",
        "https://cdn.tgdd.vn/2020/08/CookRecipe/Avatar/banh-chung-thumbnail.jpg",
    ],

    introduce:
        "Người Việt Nam từ xa xưa đã sống trong nền văn hóa lúa nước, phải phụ thuộc thiên nhiên rất nhiều. Vì thế, chiếc bánh chưng trong mâm cỗ ngày Tết mang ý nghĩa thể hiện sự biết ơn trời đất đã cho mưa thuận gió hòa để mùa màng bội thu, đem lại cuộc sống ấm no cho người dân. Không chỉ thế, bánh chưng ngày Tết còn được bày lên bàn thờ cúng để thể hiện lòng hiếu kính của con cháu với tổ tiên cùng những người đã khuất. Bánh chưng cũng là món quà biếu Tết ý nghĩa mà người Việt thường dùng để đi biếu người quen, họ hàng hoặc được bày cùng các vật dụng khác trên mâm ngũ quả ngày Tết để thể hiện cho sự tương sinh tương khắc trong ngũ hành. Thấy bánh chưng là thấy Tết! Vậy nên người Việt dù ở đâu, làm gì, vẫn luôn mong ngóng được trở về quây quần bên gia đình, cùng nhau học cách làm bánh chưng hay ngồi canh nồi bánh sôi sục, nóng hổi trên bếp lửa để cảm nhận không khí Tết đang ùa về. Cùng kể nhau nghe những câu chuyện xưa cũ rồi hít hà mùi hương thơm lừng hòa quyện từ lá dong, gạo nếp cái hoa vàng cùng vị ngọt bùi của đậu xanh, vị ngậy béo của nhân thịt trong chiếc bánh chưng – hương vị Tết không thể lẫn vào đâu được.",
    ingredientList: [
        "4,5 kg gạo nếp",
        "2kg đậu xanh không vỏ",
        "2kg thịt heo (thịt đùi và thịt mỡ)",
        "7 muỗng canh muối",
        "3 muỗng canh bột ngọt",
        "1/2 muỗng canh tiêu",
        "40 lá dong",
        "40 dây lạt",
        "Khuôn bánh (17cm)",
    ],
    steps: [
        {
            title: "Bước 1: Chuẩn bị và sơ chế",
            content:
                "Đầu tiên, đem gạo nếp cái hoa vàng vo, đãi sạch rồi cho vào nồi nước, pha thêm khoảng 4g muối rồi đảo đều và để ngâm trong khoảng 8 tiếng, ngâm xong thì vớt ra để ráo. Đậu xanh giã nhuyễn, đem ngâm nước khoảng 4 tiếng cho mềm và nở, đãi bỏ hết vỏ, vớt ra để ráo. Thêm vào 4g muối và trộn đều. Rửa từng lá dong cho thật sạch hai mặt và lau thật khô, dùng dao lóc bỏ bớt cuống dọc sống lưng lá để lá bớt cứng. Thịt ba chỉ đem rửa sạch, để ráo. Sau đó cắt thịt thành từng miếng khoảng 4cm, sau đó ướp với 4g hạt nêm, 1g tiêu để trong khoảng 30 phút cho ngấm đều.",
        },
        {
            title: "Bước 2: Gói bánh",
            content:
                "Xếp lạt thành hình chữ nhật rồi đặt khuôn lên trên. Xếp lá dong đã gấp vuông vức thành các cạnh hình chữ nhật trong khuôn. Khi xếp lá dong nên để các mặt xanh đậm của lá vào bên trong và mặt xanh nhạt hơn ra bên ngoài để mặt đậm của lá tiếp xúc với gạo sẽ làm cho bánh có màu xanh đẹp mắt hơn. Lấy chén múc khoảng 200g gạo nếp cho vào khuôn, ấn và dàn đều để gạo điền đầy khắp đáy khuôn. Tiếp tục rải đều 100g đậu xanh lên trên gạo, đặt 1 miếng thịt lên trên rồi lại rải thêm 100g đậu xanh lên cho phủ kín thịt (không nên rải đậu xanh hết đến cạnh khuôn mà nên chừa lại khoảng 1,5 cm). Sau đó lấy tiếp 200g gạo nếp rải đều xung quanh và phủ kín mặt đậu xanh. Dùng tay ấn nhẹ gạo ở các góc và mặt bánh cho gạo nén xuống. Tiếp đến, gập các cạnh lá lại, những chỗ lá thừa không cần thiết thì ta dùng kéo cắt đi cho gọn. Sau đó tay trái giữ cho lá khỏi bung ra, tay phải từ từ lấy khuôn ra đeo vào cổ tay trái. Đổi tay phải giữ lá rồi bỏ khuôn ra khỏi tay. Kéo hai đầu của mỗi sợi lạt cột bánh lại. Dùng lạt cột thêm cho đều và chắc bánh, cắt bỏ phần lạt còn dư cho bánh đẹp và gọn. Cuối cùng, bạn gập các cạnh lá lại rồi dùng kéo cắt bỏ những chỗ lá thừa cho gọn, từ từ lấy không ra và giữ lại lạt, sau đó lần lượt cột lạt lại cho thật chắc.",
        },
        {
            title: "Bước 3: Luộc bánh",
            content:
                "Xếp bánh chưng vào nồi cho đều rồi đổ nước ngập mặt bánh. Bắc lên bếp than để luộc liên tục trong khoảng 8 giờ. Trong quá trình luộc, bạn để ý nước cạn thì thêm nước vào kịp thời cho bánh chín đều và không bị cháy. Luộc tới khi bánh chín thì vớt ra rửa, sạch lá trong nước lạnh cho hết nhựa rồi để ráo. Sau đó xếp bánh thành nhiều lớp và dùng vật nặng đè lên, ép cho bánh chắc mịn, đẹp hơn rồi đem bảo quản trong tủ lạnh hoặc nơi khô ráo, thoáng mát.",
        },
    ],
    videoLink: "https://youtu.be/--l60hWNT9M?si=NPNmCbKo1YzFXC98",
});

await setDoc(doc(FIREBASE_DB, "foods", "Bánh mì"), {
    title: "Bánh mì",
    subTitle: "Vietnamese traditional bread",
    imageUrlList: [
        "https://images2.thanhnien.vn/528068263637045248/2023/11/11/screenshot20231111203106gallery-1699709509875576930930.jpg",
        "https://images2.thanhnien.vn/528068263637045248/2023/11/11/tacos-1699708764637906034185.jpeg",
        "https://www.huongnghiepaau.com/wp-content/uploads/2019/03/banh-mi-viet-1.jpg",
        "https://www.huongnghiepaau.com/wp-content/uploads/2019/03/mon-an-yeu-thich-cua-nguoi-viet.jpg",
        "https://daotaobeptruong.vn/wp-content/uploads/2021/01/banh-mi-viet-nam.jpg",
    ],

    introduce:
        "“Bánh mì”, cái tên thân thương đã in sâu trong tâm trí của bao người con đất Việt, trở thành niềm tự hào của dân tộc và là một trong những đại diện cho tinh hoa ẩm thực Việt. Trải qua bao thăng trầm lịch sử, bánh mì Việt Nam giờ đây đã vượt ra khỏi biên giới quốc gia và để lại dấu ấn trong nền ẩm thực thế giới.",
    ingredientList: [
        "1 kg bột mì số 13",
        "5 gram phụ gia",
        "2 viên vitamin C",
        "10 gram men",
        "10 gram muối",
        "4 quả trứng gà",
        "Muối, tiêu, dầu ăn, nước cốt chanh",
        "Jambon, pate, chả, nem, ngò tây, dưa leo, hành lá, ớt",
        "20 gram củ cải trắng thái sợi",
        "20 gram cà rốt thái sợi",
    ],
    steps: [
        {
            title: "Bước 1: Làm Vỏ Bánh",
            content:
                "Nhào tất cả nguyên liệu của phần vỏ bánh đến khi nhuyễn mịn, khi lấy một ít bột kéo ra mà bột không bị rách thì hỗn hợp đã được. Nếu nhào bằng máy thì công đoạn này mất khoảng 6 phút. Lần lượt nhào từng viên bột nhỏ rồi đặt lên một mặt phẳng, làm khối bột mỏng ra bằng tay và từ từ cuốn lại. Tiếp theo, se bột và cho vào khuôn nướng bánh mì. Tiến hành ủ bột trong 1.5 giờ đồng hồ ở 30 độ C, độ ẩm 80%.",
        },
        {
            title: "Bước 2: Nướng bánh",
            content:
                "Cho bánh vào nướng trong lò ở 200 độ C trong 20 phút. Lưu ý, để bánh chín đều và ngon, bạn nên làm nóng lò nướng trước 10 phút rồi hãy cho bánh vào.",
        },
        {
            title: "Bước 3: Làm Xốt Ăn Kèm Và Nhân Bánh",
            content:
                "Dùng máy đánh trứng đánh trứng gà với dầu ăn, nước cốt chanh, muối tiêu và nước. Trong một bát nhỏ, cho đường, giấm và nước vào khuấy đều. Sau đó, ngâm củ cải và cà rốt thái sợi vào bát. Cắt đôi ổ bánh mì. Phết pate và xổ lên hai bên thành bánh. Cuối cùng, cho chả, nem, đồ chua, ngò tây, dưa leo, hành lá vào và thưởng thức.",
        },
    ],
    videoLink: "https://youtu.be/k4HA1ejw_hA?si=-UIuqpmZ4BSt3eZw",
});

await setDoc(doc(FIREBASE_DB, "foods", "Bún chả"), {
    title: "Bún chả",
    subTitle: "Vietnamese traditional dish",
    imageUrlList: [
        "https://cdn.tgdd.vn/2021/01/CookRecipe/Avatar/bun-cha-ha-noi-thumbnail-1.jpg",
        "https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-202112211431417496.jpg",
        "https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-8_760x529.jpg",
        "https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271024236058.jpg",
        "https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271018143380.jpg",
    ],

    introduce:
        "Bún chả là một món ăn của Việt Nam, bao gồm bún, chả thịt lợn nướng trên than hoa và bát nước mắm chua cay mặn ngọt. Món ăn xuất xứ từ miền Bắc Việt Nam, là thứ quà có sức sống lâu bền nhất của Hà Nội, nên có thể coi đây là một trong những đặc sản đặc trưng của ẩm thực Hà thành. Bún chả có nét tương tự món bún thịt nướng ở miền Trung và miền Nam, nhưng nước mắm pha có vị thanh nhẹ hơn.",
    ingredientList: [
        "500g thịt ba chỉ",
        "500g thịt nạc vai",
        "Sả, hành khô, ớt, tỏi, chanh",
        "Đu đủ, cà rốt, rau sống ăn kèm",
        "Gia vị: tiêu, nước hàng, xì dầu đen, dầu hào, nước mắm, dầu ăn, nước tương, mật ong",
        "Rau thơm, bún",
    ],
    steps: [
        {
            title: "Bước 1: Sơ chế và chế biến nguyên liệu",
            content:
                "Thịt ba chỉ thái thành những miếng vừa ăn. Thịt nạc vai đem thái mỏng và băm rối. Hành tím, đầu hành, tỏi đập dập, băm nhuyễn rồi chia thành đôi, cho vào 2 phần thịt lợn.",
        },
        {
            title: "Bước 2: Ướp thịt bún chả Hà Nội",
            content:
                "Tiếp tục cho vào mỗi phần thịt lợn một thìa canh nước hàng hoặc xì dầu đen, 1 thìa canh dầu hào, 1 thìa canh nước mắm, ½ thìa canh đường vàng, 1 muỗng canh nước tương, 1 muỗng canh mật ong và 1 chút tiêu xay. Trộn đều để cho các gia vị thấm sâu rồi cho vào tủ lạnh để trong khoảng 3 – 4 tiếng. Phần thịt vai băm, bạn làm thành hình tròn dẹt rồi đem nướng chín. Phần thịt ba thái miếng vừa ăn cũng vậy. Cà rốt, su hào gọt vỏ rồi rửa sạch, để ráo. Cà rốt thái tròn mỏng, su hào thái vuông mỏng. Sau đó, cho chung vào một âu và cùng 1 chút muối ăn rồi xóc đều. Các loại rau thơm bạn đem ngâm với nước muối loãng trong chừng 10 – 15 phút. Sau đó, đem rửa sạch rồi cho ra rổ để ráo nước.",
        },
        {
            title: "Bước 3:  Làm nước dùng bún chả",
            content:
                "Chuẩn bị một bát nhỏ, múc 10 thìa canh nước lọc và cho 2 thìa canh đường, 2 thìa canh nước mắm vào khuấy đều cho đến khi đường tan. Tiếp tục cho 3 muỗng canh nước cốt chanh, 1 muỗng canh đường, 1 muỗng cà phê tỏi băm, 1 muỗng cà phê ớt rồi khuấy đều lên.",
        },
    ],
    videoLink: "https://youtu.be/UseREbx9O8A?si=6vzbuZlT4nrmt0Xs",
});
