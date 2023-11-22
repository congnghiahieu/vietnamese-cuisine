import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebase';
import { query, collection, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

/* await setDoc(doc(FIREBASE_DB, "users", "duyngo@gmail.com"), {
    fullname: "Ngo Hoang Duy",
    email: "duyngo@gmail.com",
    favouritedFoods: [],
    lovePosts: [],
});
 */
await setDoc(doc(FIREBASE_DB, 'foods', 'Bánh cuốn'), {
  title: 'Bánh cuốn',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://cdn.jamja.vn/blog/wp-content/uploads/2017/07/B%C3%A1nh-cu%E1%BB%91n-2.jpg',
    'https://cdn.jamja.vn/blog/wp-content/uploads/2017/07/B%C3%A1nh-cu%E1%BB%91n-3.jpg',
    'https://cdn3.ivivu.com/2022/09/B%C3%A1nh-cu%E1%BB%91n-Thanh-Tr%C3%AC-ivivu-1.jpg',
    'https://cdn3.ivivu.com/2022/09/b%C3%A1nh-cu%E1%BB%91n3.jpg',
    'https://cdn3.ivivu.com/2022/09/B%C3%A1nh-cu%E1%BB%91n-Thanh-Tr%C3%AC-ivivu-5.jpg',
  ],

  introduce:
    'Bên cạnh những món ăn sáng mang đậm đặc trưng của người Việt như phở, bún chả, bún riêu,.. thì bánh cuốn được coi như một thức quà ăn sáng mát lành mà lại cực kì bổ dưỡng, thích hợp cho những ngày hè nóng nực muốn tìm kiếm món ăn thanh mát. Bánh cuốn được biết đến như một loại bánh được làm từ bột gạo hấp, cán mỏng rồi sau đó cuộn với nhân gồm thịt, mộc nhĩ, nấm hương thái nhỏ, được rắc bên trên một chút hành khô, ăn kèm với nước chấm chua ngọt đúng điệu. Thật không khó để bắt gặp những hàng quán bánh cuốn trên đường phố Hà Nội bởi bánh cuốn được không chỉ người Việt yêu thích mà hương vị thơm ngon của chúng còn thu hút những vị khách nước ngoài. Chỉ cần thưởng thức là sẽ không bao giờ có thể quên được',
  ingredientList: [
    '200gr bột gạo',
    '200gr bột năng',
    '250gr thịt băm (không quá nhuyễn)',
    'Dầu ăn',
    'Mộc nhĩ',
    'Nấm hương',
    'Hành tây',
    'Hành củ',
    'Gia vị: mắm, muối, hạt nêm',
    'Nước lạnh',
  ],
  steps: [
    {
      title: 'Bước 1: Chế biến phần nhân bánh',
      content:
        'Đầu tiên, bạn ngâm nấm hương, mộc nhĩ với một chút nước ấm để chúng nở đều và mềm hơn. Hành tây bóc vỏ rồi sau đó thái nhỏ, gần như là băm nhuyễn. Mộc nhĩ nấm hương vớt ra rồi sau đó cũng thái nhỏ tương tự. Đối với hành củ, bạn thái nhỏ thành từng lát mỏng rồi sau đó cho lên chảo phi thơm với một chút dầu ăn, sau đó để riêng vào một đĩa có lớp giấy thấm dầu sẵn. Ướp thịt băm với hạt nêm, muối, nước mắm, để nguyên tầm 2 đến 5 phút để thịt được ngấm. Lưu ý ướp hơi nhạt một chút để khi xào chung với các nguyên liệu khác sẽ không bị mặn. Bạn có thể đảo riêng thịt băm cho săn lại. Bắc chảo lên rồi để lửa vừa, cho dầu ăn rồi sau đó cho hành tây đã thái nhỏ vào phi thơm, sau đó đổ phần thịt băm, mộc nhĩ, nấm hương vào đảo chung tầm 35 giây rồi tắt bếp. Trong lúc đảo bạn có thể tăng giảm gia vị cho phần nhân được vừa vặn.',
    },
    {
      title: 'Bước 2: Pha bột bánh và làm phần bánh tráng',
      content:
        'Nếu bạn nào muốn thử sức với cách pha bột truyền thống thì chỉ đơn giản pha nguyên liệu bột gạo với bột năng có sẵn, tùy theo chất bánh bạn muốn dai hay mềm mà pha theo tỷ lệ. Với chất bánh dai thì pha bột năng với bột gạo theo tỉ lệ 1:2 còn muốn bánh mềm một chút thì pha bột năng với bột gạo theo tỉ lệ 1:3. Rồi sau đó pha hỗn hợp bột đã trộn với 1 lít nước lọc, cho thêm 1 thìa cà phê muối, 1 thìa cà phê dầu ăn rồi sau đỏ ủ bột khoảng 1 đến 2 tiếng đồng hồ.',
    },
    {
      title: 'Bước 3: Tráng và cuốn bánh',
      content:
        'Bắc chảo lên rồi để lửa thật nhỏ, rồi dùng bông đã nhúng dầu rồi phết đều lên bề mặt chảo đã được làm nóng. Nhanh tay đổ một lượng bột bánh nhất định rồi sau đó đảo chảo để bánh được tràn đều mặt rồi đậy nắp chảo tầm 2o giây. Sau đó úp ngược chảo vào một chiếc thớt rộng để tiến hành cuộn nhân. Vì là bánh cuốn nên tráng đến đâu cuốn đến đó để tránh cho phần bánh bị chín và cứng. Sau khi để bánh lên thớt, nhanh tay cuộn nhân thành từng cuộn thuôn dài vừa ăn rồi bày dần lên đĩa.',
    },
    {
      title: 'Bước 4: Pha chế nước chấm',
      content:
        '1 muỗng canh đường, 1 muỗng canh nước mắm, 1 muống nước cốt chanh (bạn có thể thay thế bằng dấm ăn cũng được) rồi sau đó khuấy đều tất cả các nguyên liệu trên. Tăng giảm lượng cho phù hợp với khẩu vị của bạn. Rồi sau đó cho tỏi băm, ớt băm và đu đủ đã thái lát để nước chấm được thơm ngon và tròn vị hơn.',
    },
  ],
  videoLink: 'https://youtu.be/ap5PAydQay8?si=wdiOl-UVX6PtWinW',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Bánh chưng'), {
  title: 'Bánh chưng',
  subTitle: 'The soul of Vietnamese Tet Holiday ',
  imageUrlList: [
    'https://statics.vinpearl.com/banh-chung-1_1668262682.jpg',
    'https://statics.vinpearl.com/banh-chung-3_1668262666.jpg',
    'https://cdn.tgdd.vn/2020/08/CookProduct/37-1200x676.jpg',
    'https://cdn.tgdd.vn/Files/2015/01/31/605299/cach-lam-banh-chung-cho-ngay-tet-2-1.jpg',
    'https://cdn.tgdd.vn/2020/08/CookRecipe/Avatar/banh-chung-thumbnail.jpg',
  ],

  introduce:
    'Người Việt Nam từ xa xưa đã sống trong nền văn hóa lúa nước, phải phụ thuộc thiên nhiên rất nhiều. Vì thế, chiếc bánh chưng trong mâm cỗ ngày Tết mang ý nghĩa thể hiện sự biết ơn trời đất đã cho mưa thuận gió hòa để mùa màng bội thu, đem lại cuộc sống ấm no cho người dân. Không chỉ thế, bánh chưng ngày Tết còn được bày lên bàn thờ cúng để thể hiện lòng hiếu kính của con cháu với tổ tiên cùng những người đã khuất. Bánh chưng cũng là món quà biếu Tết ý nghĩa mà người Việt thường dùng để đi biếu người quen, họ hàng hoặc được bày cùng các vật dụng khác trên mâm ngũ quả ngày Tết để thể hiện cho sự tương sinh tương khắc trong ngũ hành. Thấy bánh chưng là thấy Tết! Vậy nên người Việt dù ở đâu, làm gì, vẫn luôn mong ngóng được trở về quây quần bên gia đình, cùng nhau học cách làm bánh chưng hay ngồi canh nồi bánh sôi sục, nóng hổi trên bếp lửa để cảm nhận không khí Tết đang ùa về. Cùng kể nhau nghe những câu chuyện xưa cũ rồi hít hà mùi hương thơm lừng hòa quyện từ lá dong, gạo nếp cái hoa vàng cùng vị ngọt bùi của đậu xanh, vị ngậy béo của nhân thịt trong chiếc bánh chưng – hương vị Tết không thể lẫn vào đâu được.',
  ingredientList: [
    '4,5 kg gạo nếp',
    '2kg đậu xanh không vỏ',
    '2kg thịt heo (thịt đùi và thịt mỡ)',
    '7 muỗng canh muối',
    '3 muỗng canh bột ngọt',
    '1/2 muỗng canh tiêu',
    '40 lá dong',
    '40 dây lạt',
    'Khuôn bánh (17cm)',
  ],
  steps: [
    {
      title: 'Bước 1: Chuẩn bị và sơ chế',
      content:
        'Đầu tiên, đem gạo nếp cái hoa vàng vo, đãi sạch rồi cho vào nồi nước, pha thêm khoảng 4g muối rồi đảo đều và để ngâm trong khoảng 8 tiếng, ngâm xong thì vớt ra để ráo. Đậu xanh giã nhuyễn, đem ngâm nước khoảng 4 tiếng cho mềm và nở, đãi bỏ hết vỏ, vớt ra để ráo. Thêm vào 4g muối và trộn đều. Rửa từng lá dong cho thật sạch hai mặt và lau thật khô, dùng dao lóc bỏ bớt cuống dọc sống lưng lá để lá bớt cứng. Thịt ba chỉ đem rửa sạch, để ráo. Sau đó cắt thịt thành từng miếng khoảng 4cm, sau đó ướp với 4g hạt nêm, 1g tiêu để trong khoảng 30 phút cho ngấm đều.',
    },
    {
      title: 'Bước 2: Gói bánh',
      content:
        'Xếp lạt thành hình chữ nhật rồi đặt khuôn lên trên. Xếp lá dong đã gấp vuông vức thành các cạnh hình chữ nhật trong khuôn. Khi xếp lá dong nên để các mặt xanh đậm của lá vào bên trong và mặt xanh nhạt hơn ra bên ngoài để mặt đậm của lá tiếp xúc với gạo sẽ làm cho bánh có màu xanh đẹp mắt hơn. Lấy chén múc khoảng 200g gạo nếp cho vào khuôn, ấn và dàn đều để gạo điền đầy khắp đáy khuôn. Tiếp tục rải đều 100g đậu xanh lên trên gạo, đặt 1 miếng thịt lên trên rồi lại rải thêm 100g đậu xanh lên cho phủ kín thịt (không nên rải đậu xanh hết đến cạnh khuôn mà nên chừa lại khoảng 1,5 cm). Sau đó lấy tiếp 200g gạo nếp rải đều xung quanh và phủ kín mặt đậu xanh. Dùng tay ấn nhẹ gạo ở các góc và mặt bánh cho gạo nén xuống. Tiếp đến, gập các cạnh lá lại, những chỗ lá thừa không cần thiết thì ta dùng kéo cắt đi cho gọn. Sau đó tay trái giữ cho lá khỏi bung ra, tay phải từ từ lấy khuôn ra đeo vào cổ tay trái. Đổi tay phải giữ lá rồi bỏ khuôn ra khỏi tay. Kéo hai đầu của mỗi sợi lạt cột bánh lại. Dùng lạt cột thêm cho đều và chắc bánh, cắt bỏ phần lạt còn dư cho bánh đẹp và gọn. Cuối cùng, bạn gập các cạnh lá lại rồi dùng kéo cắt bỏ những chỗ lá thừa cho gọn, từ từ lấy không ra và giữ lại lạt, sau đó lần lượt cột lạt lại cho thật chắc.',
    },
    {
      title: 'Bước 3: Luộc bánh',
      content:
        'Xếp bánh chưng vào nồi cho đều rồi đổ nước ngập mặt bánh. Bắc lên bếp than để luộc liên tục trong khoảng 8 giờ. Trong quá trình luộc, bạn để ý nước cạn thì thêm nước vào kịp thời cho bánh chín đều và không bị cháy. Luộc tới khi bánh chín thì vớt ra rửa, sạch lá trong nước lạnh cho hết nhựa rồi để ráo. Sau đó xếp bánh thành nhiều lớp và dùng vật nặng đè lên, ép cho bánh chắc mịn, đẹp hơn rồi đem bảo quản trong tủ lạnh hoặc nơi khô ráo, thoáng mát.',
    },
  ],
  videoLink: 'https://youtu.be/--l60hWNT9M?si=NPNmCbKo1YzFXC98',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Bánh mì'), {
  title: 'Bánh mì',
  subTitle: 'Vietnamese traditional bread',
  imageUrlList: [
    'https://images2.thanhnien.vn/528068263637045248/2023/11/11/screenshot20231111203106gallery-1699709509875576930930.jpg',
    'https://images2.thanhnien.vn/528068263637045248/2023/11/11/tacos-1699708764637906034185.jpeg',
    'https://www.huongnghiepaau.com/wp-content/uploads/2019/03/banh-mi-viet-1.jpg',
    'https://www.huongnghiepaau.com/wp-content/uploads/2019/03/mon-an-yeu-thich-cua-nguoi-viet.jpg',
    'https://daotaobeptruong.vn/wp-content/uploads/2021/01/banh-mi-viet-nam.jpg',
  ],

  introduce:
    '“Bánh mì”, cái tên thân thương đã in sâu trong tâm trí của bao người con đất Việt, trở thành niềm tự hào của dân tộc và là một trong những đại diện cho tinh hoa ẩm thực Việt. Trải qua bao thăng trầm lịch sử, bánh mì Việt Nam giờ đây đã vượt ra khỏi biên giới quốc gia và để lại dấu ấn trong nền ẩm thực thế giới.',
  ingredientList: [
    '1 kg bột mì số 13',
    '5 gram phụ gia',
    '2 viên vitamin C',
    '10 gram men',
    '10 gram muối',
    '4 quả trứng gà',
    'Muối, tiêu, dầu ăn, nước cốt chanh',
    'Jambon, pate, chả, nem, ngò tây, dưa leo, hành lá, ớt',
    '20 gram củ cải trắng thái sợi',
    '20 gram cà rốt thái sợi',
  ],
  steps: [
    {
      title: 'Bước 1: Làm Vỏ Bánh',
      content:
        'Nhào tất cả nguyên liệu của phần vỏ bánh đến khi nhuyễn mịn, khi lấy một ít bột kéo ra mà bột không bị rách thì hỗn hợp đã được. Nếu nhào bằng máy thì công đoạn này mất khoảng 6 phút. Lần lượt nhào từng viên bột nhỏ rồi đặt lên một mặt phẳng, làm khối bột mỏng ra bằng tay và từ từ cuốn lại. Tiếp theo, se bột và cho vào khuôn nướng bánh mì. Tiến hành ủ bột trong 1.5 giờ đồng hồ ở 30 độ C, độ ẩm 80%.',
    },
    {
      title: 'Bước 2: Nướng bánh',
      content:
        'Cho bánh vào nướng trong lò ở 200 độ C trong 20 phút. Lưu ý, để bánh chín đều và ngon, bạn nên làm nóng lò nướng trước 10 phút rồi hãy cho bánh vào.',
    },
    {
      title: 'Bước 3: Làm Xốt Ăn Kèm Và Nhân Bánh',
      content:
        'Dùng máy đánh trứng đánh trứng gà với dầu ăn, nước cốt chanh, muối tiêu và nước. Trong một bát nhỏ, cho đường, giấm và nước vào khuấy đều. Sau đó, ngâm củ cải và cà rốt thái sợi vào bát. Cắt đôi ổ bánh mì. Phết pate và xổ lên hai bên thành bánh. Cuối cùng, cho chả, nem, đồ chua, ngò tây, dưa leo, hành lá vào và thưởng thức.',
    },
  ],
  videoLink: 'https://youtu.be/k4HA1ejw_hA?si=-UIuqpmZ4BSt3eZw',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Bún chả'), {
  title: 'Bún chả',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://cdn.tgdd.vn/2021/01/CookRecipe/Avatar/bun-cha-ha-noi-thumbnail-1.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-202112211431417496.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-8_760x529.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271024236058.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271018143380.jpg',
  ],

  introduce:
    'Bún chả là một món ăn của Việt Nam, bao gồm bún, chả thịt lợn nướng trên than hoa và bát nước mắm chua cay mặn ngọt. Món ăn xuất xứ từ miền Bắc Việt Nam, là thứ quà có sức sống lâu bền nhất của Hà Nội, nên có thể coi đây là một trong những đặc sản đặc trưng của ẩm thực Hà thành. Bún chả có nét tương tự món bún thịt nướng ở miền Trung và miền Nam, nhưng nước mắm pha có vị thanh nhẹ hơn.',
  ingredientList: [
    '500g thịt ba chỉ',
    '500g thịt nạc vai',
    'Sả, hành khô, ớt, tỏi, chanh',
    'Đu đủ, cà rốt, rau sống ăn kèm',
    'Gia vị: tiêu, nước hàng, xì dầu đen, dầu hào, nước mắm, dầu ăn, nước tương, mật ong',
    'Rau thơm, bún',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế và chế biến nguyên liệu',
      content:
        'Thịt ba chỉ thái thành những miếng vừa ăn. Thịt nạc vai đem thái mỏng và băm rối. Hành tím, đầu hành, tỏi đập dập, băm nhuyễn rồi chia thành đôi, cho vào 2 phần thịt lợn.',
    },
    {
      title: 'Bước 2: Ướp thịt bún chả Hà Nội',
      content:
        'Tiếp tục cho vào mỗi phần thịt lợn một thìa canh nước hàng hoặc xì dầu đen, 1 thìa canh dầu hào, 1 thìa canh nước mắm, ½ thìa canh đường vàng, 1 muỗng canh nước tương, 1 muỗng canh mật ong và 1 chút tiêu xay. Trộn đều để cho các gia vị thấm sâu rồi cho vào tủ lạnh để trong khoảng 3 – 4 tiếng. Phần thịt vai băm, bạn làm thành hình tròn dẹt rồi đem nướng chín. Phần thịt ba thái miếng vừa ăn cũng vậy. Cà rốt, su hào gọt vỏ rồi rửa sạch, để ráo. Cà rốt thái tròn mỏng, su hào thái vuông mỏng. Sau đó, cho chung vào một âu và cùng 1 chút muối ăn rồi xóc đều. Các loại rau thơm bạn đem ngâm với nước muối loãng trong chừng 10 – 15 phút. Sau đó, đem rửa sạch rồi cho ra rổ để ráo nước.',
    },
    {
      title: 'Bước 3:  Làm nước dùng bún chả',
      content:
        'Chuẩn bị một bát nhỏ, múc 10 thìa canh nước lọc và cho 2 thìa canh đường, 2 thìa canh nước mắm vào khuấy đều cho đến khi đường tan. Tiếp tục cho 3 muỗng canh nước cốt chanh, 1 muỗng canh đường, 1 muỗng cà phê tỏi băm, 1 muỗng cà phê ớt rồi khuấy đều lên.',
    },
  ],
  videoLink: 'https://youtu.be/UseREbx9O8A?si=6vzbuZlT4nrmt0Xs',
});

//////////////////////////////////////////////////////////////////////////////
await setDoc(doc(FIREBASE_DB, 'foods', 'Nem'), {
  title: 'Nem',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'http://vietnamtravel.com.vn/wp-content/uploads/2020/04/nem-4.jpg',
    'http://vietnamtravel.com.vn/wp-content/uploads/2020/04/nem-3.jpg',
    'https://cdn3.ivivu.com/2022/09/B%C3%A1nh-cu%E1%BB%91n-Thanh-Tr%C3%AC-ivivu-1.jpg',
    'https://i1-giadinh.vnecdn.net/2022/01/22/Thanh-pham-1-2927-1642852742.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=oYjvFa0w9s1Mc22tjb47Ag',
    'https://daotaobeptruong.vn/wp-content/uploads/2020/01/nem-ran-ha-noi.jpg',
  ],

  introduce:
    'Theo nhiều tài liệu, nguồn gốc món nem rán là nền ẩm thực Trung Hoa, thuộc nhóm các món dim sum nổi tiếng. Khi du nhập vào nước ta, món nem rán đã được biến tấu thành phần nguyên liệu và gia vị cho phù hợp với khẩu vị của người Việt. Cho đến nay, nem rán trở thành món ăn quen thuộc, không thể thiếu trên cỗ ngày Tết của nhiều gia đình. Sự kết hợp giữa thịt băm, miến, su hào, cà rốt, hành tây, trứng gà, mộc nhĩ, nấm hương cùng các loại gia vị tạo nên miếng nem rán đẹp mắt, ngon miệng làm xiêu lòng người ăn.',
  ingredientList: [
    '600 gr thịt nạc vai xay',
    '200 gr tôm nõn',
    '5 gr mộc nhĩ khô',
    '3 gr nấm hương khô',
    '1 nắm miến',
    '1 củ đậu (hoặc giá đỗ, tùy chọn)',
    '1 củ hành tây',
    '1/2 củ cà rốt',
    '1 - 2 quả trứng',
    'Gia vị: mắm, muối, hạt nêm, hạt tiêu',
    'Bánh đa nem để gói',
    'Bia để phết bánh đa nem cho giòn',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Mộc nhĩ, nấm hương ngâm nở, rửa sạch, để ráo và thái nhỏ. Cà rốt, su hào, củ đậu, hành tây thái sợi mỏng nhỏ. Miến ngâm mềm, để khô ráo, cắt nhỏ (không nên ngâm nhũn quá). Rau mùi, hành hoa rửa sạch thái nhỏ. Hành khô băm nhỏ. Tôm tươi bóc vỏ, rồi thái hạt lựu.',
    },
    {
      title: 'Bước 2: Trộn nhân',
      content:
        ' Cho thịt vào nồi/hoặc âu thêm 1 thìa canh dầu ăn, 1 thìa cà phê hạt nêm, 1 thìa cà phê muối (bột canh), 1 thìa cà phê mắm, 2 thìa cà phê hạt tiêu, trộn đều. Sau đó tiếp tục cho hỗn hợp rau củ vào trộn. Khi nào chuẩn bị gói nem thì mới cho trứng gà để tránh nhân bị chảy nước.',
    },
    {
      title: 'Bước 3: Gói nem',
      content:
        'Đặt lá bánh đa nem lên mặt phẳng, dùng khăn xô thấm chút bia cho hơi ẩm thoa đều cho bánh đa nem mềm, thêm 1/2 lá đa nem nữa lót để tránh vỡ nhân khi rán. Múc lượng nhân vừa phải vào, lúc này cho 2-3 miếng tôm tươi đã thái hạt lựu vào và gói đều tay.',
    },
    {
      title: 'Bước 4: Rán nem',
      content:
        'Nên rán 2 lần thì nem sẽ giòn rụm, thơm ngon. Lần thứ nhất cho dầu ăn nóng (thử đầu đũa sủi tăm là đạt), cho nem vào rán ở lửa nhỏ vừa, khi nem se mặt và chín khoảng 70- 80% thì vớt ra để giấy thấm dầu cho nguội. Sau đó, chia ra các mẻ (tương đương mỗi bữa ăn), rồi đem cấp đông.',
    },
  ],
  videoLink: 'https://youtu.be/KMfZAVBrKPk?si=rMe2l9N3I5jVVWkk',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Bún đậu mắm tôm'), {
  title: 'Bún đậu mắm tôm',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://bizweb.dktcdn.net/100/438/408/files/mon-an-truyen-thong-viet-nam-4.jpg?v=1694685337627',
    'https://bizweb.dktcdn.net/100/438/408/files/mon-an-truyen-thong-viet-nam-4.jpg?v=1694685337627',
    'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/119911_body_-7-2.jpg',
    'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/bun-dau-mam-tom-2-1-e1505461736250.jpg',
    'https://dauhomemade.vn/apps/uploads/2019/01/020A3144-1024x682.jpg',
  ],

  introduce:
    'Đi đến nơi đâu trên khắp miền đất nước, chúng ta cũng có thể bắt gặp những hàng rong với vị thơm của đậu và mùi mắm tôm thơm phức. Hãy thử sà vào một hàng nào đó xem, ắt bạn sẽ được sự chào đón của cô hàng bún. Này nhé, đầu tiên những bàn tay của cô hàng bún thoăn thoắt cầm dao cắt đậu hũ thành những miếng nhỏ rồi cho vào cái chảo ngập những mỡ, rán lên. Trong lúc đó, những lá bún được cắt ra, bày vào đĩa. Đến khi đậu rán chín vàng, đĩa đậu cắt nhỏ bên cạnh đĩa bún, bát mắm tôm sao hấp dẫn vậy! Bún dùng để ăn trong món này là bún lá. Những lá bún khi ăn cho ta độ dẻo, bùi bùi, không bị chua, lại dễ gắp. Mắm tôm được đựng trong một chiếc bát con. Mắm được vắt chanh rồi đánh bông lên, vài lát ớt và một chút mỡ trên chảo đậu được rưới vào làm cho mùi thơm beo béo dậy lên. Rau sống rửa sạch rồi bày ra đĩa. Bún đậu mắm tôm khi ăn cho ta cảm giác ngậy, thơm, cay cay của ớt, của rau sống.',
  ingredientList: [
    'Bún lá: 500gr',
    'Chả cốm: 200gr',
    'Đậu hũ: 3 bìa',
    'Thịt chân giò: 300gr',
    'Rau ăn kèm: Dưa leo, rau kinh giới, tía tô và các loại rau thơm khác',
    'Gia vị: Mắm tôm, quất, ớt, tỏi, đường, muối, dầu ăn, mì chính và rượu trắng',
  ],
  steps: [
    {
      title: 'Bước 1: Chuẩn bị và chế biến thịt chân giò:',
      content:
        'Thịt chân giò rửa sạch dùng dây cuộn chặt lại (bạn có thể nhờ người bán hàng cuộn giúp), cho vào nồi luộc qua nước sôi khoảng 2 phút sau đó đổ phần nước này đi. Thịt đem rửa lại cho sạch, đặt một nồi nước khác, cho thịt vào luộc chín cùng chút muối. Thịt chín lấy ra cho nguội rồi thái miếng mỏng.',
    },
    {
      title: 'Bước 2: Chế biến Đậu và Chả cốm',
      content:
        'Đậu hũ rửa qua nước lạnh, để ráo, xắt miếng vừa ăn. Sau đó cho vào chiên vàng các mặt rồi gắp ra đĩa. Vẫn dùng cái chảo vừa rán đậu cho chả cốm vào chiên vàng hai mặt thì gắp ra đĩa, cắt nhỏ thành những miếng vừa ăn.',
    },
    {
      title: 'Bước 3: Chuẩn bị bún và rau xanh ăn kèm',
      content:
        'Bún lá cắt miếng vừa ăn. Dưa leo rửa sạch, gọt vỏ, thái miếng. Rau thơm các loại nhặt bỏ cành, lá già, úa sau đó rửa sạch, ngâm nước muối loãng khoảng 30 phút rồi vớt ra rổ, vẩy sạch nước.',
    },
    {
      title: 'Bước 4: Quan trọng – Làm mắm tôm',
      content:
        'Lấy khoảng 3 trái quất bổ đôi, vắt lấy nước cốt, bỏ hạt. Ớt rửa sạch, bỏ cuống, xắt lát. Tỏi bóc vỏ, rửa sạch, đập giập, bằm nhỏ. Lấy 1 thìa canh mắm tôm cho vào bát, thêm 1,5 thìa cà phê đường, ít mì chính, nước cốt quất ở trên cùng 1 thìa cà phê rượu trắng và 1 thìa dầu ăn vừa rán đậu khi nãy. Sau đó dùng đũa đánh cho hỗn hợp này sủi bọt, nêm nếm vừa ăn rồi cho phần ớt xắt, tỏi bằm ở trên vào đảo đều là được.',
    },
  ],
  videoLink: 'https://youtu.be/QcaSNX__UjU?si=9rAYP1wlf3c2PetP',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Bún bò Huế'), {
  title: 'Bún bò Huế',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-1-1638013798.jpeg',
    'https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-2-1638013798.jpeg',
    'https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-7-1638013798.jpeg',
    'https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-3-1638013798.jpeg',
    'https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-4-1638013798.jpeg',
  ],

  introduce:
    'Xuất thân vốn là một món ăn chốn cung đình, chẳng biết từ khi nào Bún bò huế đã trở thành ‘nàng thơ’ mới của nền ẩm thực cố đô. Để rồi từ đó cho đến mãi sau này, cứ mỗi khi nhắc về xứ Huế kinh kỳ, người ta vẫn luôn nhắc đến như là cái nôi, là cội nguồn của món ăn với hương vị đậm đà cùng mùi thơm quyến rũ, hấp dẫn mọi người nhanh đến thưởng thức.',
  ingredientList: [
    '2kg xương ống heo',
    '700g bắp giò heo (nên chọn giò trước)',
    'Hành tím/ đầu hành lá, ngò rí xay mỗi loại 200g',
    'Cọng bún bò tươi',
    '700g bắp bò',
    '20 chả lá Huế',
    'Gia vị nấu bún bò Huế: mắm ruốc Huế Bà Duệ, dầu màu điều, nước mắm, đường phèn, muối, dầu ăn',
    'Rau muống cọng, hoa chuối',
    '100g ớt xanh',
    '100g gừng',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ Chế Nguyên Liệu',
      content:
        'Xương ống heo rửa sạch, để ráo nước, cho vào lò nướng với 2 cây sả đập dập, gừng tươi dập, hành tây, thơm, ớt đỏ trong vòng 30 phút. Dùng chỉ hoặc lạt mỏng bó chặt bắp bò và bắp giò heo lại. Bạn nhớ bó thật chặt tay. Sau đó cho ít sả cây, hành tây vào nồi nước sôi, thả bắp bò, bắp giò heo vào chần sơ rồi vớt ra cho vào âu nước đá lạnh. Thả tiếp xương ống heo đã nướng vào nồi nước sôi, chần sơ rồi lại cho vào nước đá. Vớt ra để ráo.',
    },
    {
      title: 'Bước 2: Nấu Nước Dùng',
      content:
        'Cho các nguyên liệu nấu bún bò Huế gồm hành tây, gừng đập dập, thơm cắt khoanh, ớt xanh, sả cây vào nồi nước. Khi nước sôi thì cho bắp bò, bắp giò heo, xương ống vào nấu chung, vớt bọt, hạ nhỏ lửa hầm cho đến khi bắp bò và bắp giò heo chín. Sau đó vớt bắp bò, bắp giò heo ra. Tiếp theo, bạn vớt bỏ hành tây, sả, gừng, thơm trong nồi nước dùng ra bỏ và châm thêm nước sôi vào để thay thế lượng nước đã bay hơi trong lúc hầm. Lúc này, bạn đun sôi và nêm lại ½ muỗng canh muối, 2 muỗng canh đường phèn, 3 muỗng canh nước mắm và 80g mắm ruốc (mắm ruốc hòa tan cùng với nước dùng), khuấy đều và bạn nên nêm nếm lại cho vừa với khẩu vị của mình.',
    },
    {
      title: 'Bước 3: Làm Ớt Sa Tế',
      content:
        'Cho 1 muỗng canh dầu ăn vào chảo nóng, thêm hành lá, ngò rí, hành tím, tỏi, sả xay vào phi thơm, thêm ớt xay, 1 muỗng canh dầu điều vào trộn đều. Cho một nửa ra chén. Một nửa còn lại xào sơ với bắp bò cho thơm. ',
    },
    {
      title: 'Bước 4: Trình Bày Và Thưởng Thức',
      content:
        'Bào mỏng hoa chuối và cọng rau muống. Cắt lát mỏng bắp bò, bắp giò heo. Cắt miếng chả lá Huế hoặc để nguyên cây nếu thích. Trụng sơ bún qua nước sôi, cho lượng bún vừa đủ dùng vào tô, xếp bắp bò, bắp giò heo, chả lá vào tô. Chan nước dùng vào, rắc lên trên ít hành lá và đừng quên thưởng thức cùng hoa chuối, rau muống bào, sa tế.',
    },
  ],
  videoLink: 'https://youtu.be/qWK_HYlKrAA?si=f2dDggdrh-GTqs4b',
});
