import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebase';
import { query, collection, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

// Dung
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

// Duy Ngo

await setDoc(doc(FIREBASE_DB, 'foods', 'Cơm tấm'), {
  title: 'Cơm tấm',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-0_1630562640.jpg',
    'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-1_1630562690.jpg',
    'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-2_1630562728.jpg',
    'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-3_1630562756.jpg',
    'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-5_1630562815.jpg',
  ],

  introduce:
    'Ban đầu, Cơm tấm là một món ăn phổ biến của những người nông dân, công nhân tại vùng đồng bằng sông Cửu Long. Vào các năm mùa màng đói kém, nhiều người thường không có đủ gạo ngon để bán, vì vậy họ đã dùng gạo tấm để nấu ăn vì nó luôn có sẵn trong nhà của nhiều hộ gia đình cũng như có tác dụng làm no lâu.Từ khi Việt Nam đô thị hóa vào nửa đầu thế kỷ 20, Cơm tấm đã trở nên phổ biến ở hầu khắp các tỉnh Nam Bộ, trong đó có Sài Gòn',
  ingredientList: [
    '4 miếng sườn cốt lết heo vừa',
    '300g gạo tấm',
    '60g gạo trắng để làm thính',
    '100g bì heo',
    '3 quả trứng gà',
    '50g thịt nạc heo xay',
    '50g miến',
    'Nấm mèo khô, sả, tỏi băm, hành tím băm, ớt băm, hành lá xắt nhuyễn,',
    'Gia vị: mật ong, nước mắm, bột ngọt, muối, dầu hào, tiêu xay, đường, giấm',
    'Rau ăn kèm: cà chua, dưa leo, cà rốt, củ cải trắng',
  ],
  steps: [
    {
      title: 'Bước 1: Nấu cơm',
      content: 'Gạo tấm mua về vo sạch qua 2 - 3 lần và nấu trong nồi cơm điện như bình thường.',
    },
    {
      title: 'Bước 2: Làm phần sườn cốt lết nướng',
      content:
        'Thịt cốt lết mua về rửa sạch và dùng khăn thấm cho ráo. Tiếp đến, dùng búa đập thịt để làm thịt mỏng và mềm hơn (Nếu không có búa đập thịt bạn cũng có thể dùng chày giã bình thường). Ướp thịt với sả, bột ngọt, hạt nêm, mật ong, nước mắm, hành tím băm, tỏi băm. Trộn đều và uớp thịt trong 1 tiếng. Nướng từng miếng thịt trên bếp than đến khi chín vàng đều hai mặt. Nếu bạn nướng bằng lò nướng hoặc nồi chiên không dầu có thể chỉnh nhiệt độ 180 độ C từ 30 - 45 phút.',
    },
    {
      title: 'Bước 3: Làm chả trứng hấp',
      content:
        'Ngâm nấm mèo khô trong nước ấm 20 phút cho nở, sau đó rửa sạch, cắt bỏ phần chân và băm nhỏ. Miến ngâm trong 10 phút và cũng mang đi xắt nhỏ. Trộn đều thịt nạc heo xay, mộc nhĩ và miến đã xắt nhỏ. Sau đó nêm với 2 muỗng muối, 1 muỗng đường, 1 muỗng nước mắm và 1 muỗng hành tím băm. Trộn đều để các nguyên liệu thấm đều gia vị.Cho phần chả trứng vào hấp cách thủy trong 30 phút. Sau đó cho lòng đỏ trứng còn lại lên bề mặt và hấp thêm 10 phút là hoàn tất.',
    },
    {
      title: 'Bước 4: Làm bì heo',
      content:
        'Bì heo mua về rửa sạch và mang đi luộc nhanh trong 15 phút để bì giữ được độ dai.Sau khi vớt ra cho ngay bì heo vào nước đá để giữ được độ giòn. Ngâm bì heo trong 5 phút và vớt ra để ráo. Xắt mỏng phần bì heo.',
    },
    {
      title: 'Bước 5: Làm thính',
      content:
        'Rang 60g gạo trắng đến khi chuyển sang màu vàng nâu. Để gạo cho nguội hoàn toàn và bỏ vào máy xay nhuyễn. Trộn thính vào phần bì đã xắt nhuyễn là hoàn thành món bì heo.',
    },
    {
      title: 'Bước 6: Làm đồ chua',
      content:
        'Củ cải trắng và cà rốt mua về rửa sạch, gọt vỏ và bào thành sợi nhỏ. Pha 100ml giấm, 3 muỗng đường và nửa muỗng muối và đổ vào phần củ đã thái sợi. Trộn đều và ngâm trong 1 tiếng là được.',
    },
    {
      title: 'Bước 7: Làm phần mỡ hành',
      content:
        'Hành lá xắt nhuyễn cho thêm ¼ muỗng muối, ¼ muỗng đường và trộn đều.Dầu ăn nấu sôi và chế vào phần hành lá đã chuẩn bị. Trộn cho phần hành lá chín hết là hoàn thành.',
    },
    {
      title: 'Bước 8: Pha chế nước mắm',
      content:
        'Đun sôi và khuấy đều hỗn hợp 3 muỗng nước mắm, 3 muỗng đường, 3 muỗng nước ấm và 1 muỗng giấm. Để hỗn hợp nguội, sau đó thêm ½ muỗng mắm và ½ muỗng giấm vào, nêm vừa miệng. Sau đó ớt băm và tỏi băm nhỏ vào',
    },
    {
      title: 'Bước 9: Thưởng thức',
      content:
        'Cho cơm đã nấu chín vào chén và úp ngược vào dĩa để có hình đẹp mắt. Rưới thêm mỡ hành lên cơm để tạo màu sắc. Xắt lát cà chua, dưa leo và lấy phần đồ chua đã ngâm ra. Đặt phần sườn nướng, chả trứng, bì và chén nước mắm đã pha lên xung quanh cơm là hoàn thành món cơm tấm sườn bì chả thơm ngon tại nhà.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=cJu6tFJe_Gc',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Bánh xèo'), {
  title: 'Bánh xèo',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://static.vinwonders.com/2022/10/banh-xeo-nha-trang-2.jpg',
    'https://static.vinwonders.com/2022/10/banh-xeo-nha-trang-1.jpg',
    'https://static.vinwonders.com/2022/10/banh-xeo-nha-trang-5.jpeg',
    'https://static.vinwonders.com/2022/10/banh-xeo-nha-trang-6.jpg',
    'https://static.vinwonders.com/2022/10/banh-xeo-nha-trang-7.jpg',
    'https://static.vinwonders.com/2022/10/banh-xeo-nha-trang-9.jpeg',
  ],

  introduce:
    'Bánh xèo không chỉ là món ăn truyền thống của Việt Nam mà còn là một biểu tượng đặc trưng của ẩm thực miền Trung và miền Nam. Món ăn này có nguồn gốc từ vùng Trung Bộ và đã đi vào lòng người từ Nghệ An đến Huế và khắp các tỉnh thành cả nước',
  ingredientList: [
    '200gr bột gạo khô',
    '10gr bột nghệ',
    '200gr thịt lợn',
    '200gr tôm',
    '100ml bia (cho bánh xèo giòn hơn)',
    '1 củ hành tây',
    '100gr giá đỗ',
    'Gia vị: muối, đường, tiêu, hành tím, gừng, hành lá',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Tôm sau khi mua về rửa sạch, cắt râu, sau đó ướp tôm với một muỗng cà phê muối, 1 muỗng cà phê gừng giã ra trong 15-20 phút. Thịt heo rửa sạch với muối sau đó đem thái mỏng. Ướp thịt heo với 1 muỗng canh nước mắm, 1 muỗng cà phê bột ngọt, ½ muỗng cà phê tiêu và để trong 15-20 phút cho thịt thấm gia vị. Rửa sạch và cắt nhỏ hành lá, hành tây, giá và các loại rau.',
    },
    {
      title: 'Bước 2: Làm vỏ bánh xèo và xào nhân bánh',
      content:
        'Để pha bột làm bánh xèo, bạn trộn 200gr bột gạo, 10gr bột nghệ, 250ml nước lọc, 100ml bia, 1 muỗng cà phê muối với hành lá băm lại, khuấy bột cho thật đều tay để bột tan hết. Bạn có thể cho thêm vào bột bánh một chút dầu ăn, khi bạn đổ bánh xèo, bánh sẽ dễ tróc ra và đẹp hơn.',
    },
    {
      title: 'Bước 3: Làm nhân bánh',
      content:
        ' Bắc chảo dầu lên bếp và cho vào 2 muỗng dầu ăn, phi hành tím cho thơm. Sau đó, cho tôm, thịt, nấm hương vào xào cho đến khi săn lại, cho thêm hành tây vào đảo đều. Khi hành tây hơi chuyển màu, bạn nêm nếm cho vừa ăn rồi tắt bếp.',
    },
    {
      title: 'Bước 4: Đổ bánh xèo',
      content:
        'Bắc chảo lên bếp và cho vào một lớp dầu mỏng. Sau khi dầu nóng, bạn múc muỗng canh bột vừa và tráng đều chảo. Đổ một lớp bột vừa phải đủ để tráng hết mặt chảo nhưng đừng quá dày vì lớp bột dày làm bánh xèo không còn được giòn nữa. Sau đó, bạn chiên từ từ với lửa nhỏ để nước trong bột bốc hơi đi, thì bánh xèo của chúng ta sẽ giòn ngon vô cùng.Sau đó, cho thêm một ít nhân và giá vào. Để lửa nhỏ, đợi khoảng 2 phút cho vỏ bánh khô giòn rồi bạn gấp đôi bánh lại hong thêm một chút và để bánh ra dĩa.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=hxI-i5jAeB8',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Sủi dìn'), {
  title: 'Sủi dìn',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://statics.vinpearl.com/sui-din-03_1630468015.jpg',
    'https://statics.vinpearl.com/sui-din-01_1630467952.jpg',
    'https://statics.vinpearl.com/sui-din-06_1630468144.jpg',
    'https://statics.vinpearl.com/sui-din-08_1630468236.jpg',
    'https://statics.vinpearl.com/sui-din-10_1630468302.jpg',
  ],

  introduce:
    'Món sủi dìn là thức ăn đường phố vào mùa đông, là món ăn nóng hổi bắt nguồn từ cộng đồng người Hoa ở Hải Phòng xưa, lấy cảm hứng từ món bánh trôi nước.',
  ingredientList: [
    '100 g vừng đen',
    '50 g lạc rang',
    '50 g dừa nạo',
    '50 g đường',
    '300 g bột nếp',
    '1 củ hành tây',
    '300 g Đường phèn màu nâu hoặc đường thốt nốt',
    'Gừng tươi rửa sạch đập giập',
  ],
  steps: [
    {
      title: 'Bước 1: Làm vỏ bánh',
      content:
        'Cho bột vào âu, rót từ từ nước nóng vào bột rồi nhào (có thể dùng máy). Nhào một chút lại thêm nước rồi nhào đến khi khối bột mịn dẻo không khô, không nhão. Nhào thêm chút rồi phủ lên âu khăn ẩm để bột nghỉ 30p.',
    },
    {
      title: 'Bước 2: Làm nhân bánh',
      content:
        'Rang vừng và lạc sau đó giã nhuyễn. Sau đó cho chút nước vào chảo, cho đường vào đun lửa nhỏ. Khi đường tan cho dừa vào xào sơ, tiếp đến lạc và vừng. Xào cho nhân quyện vào nhau',
    },
    {
      title: 'Bước 3: Làm nước chan',
      content:
        'Nướng gừng cho thơm rồi đập dập bỏ vào nồi nước cùng với đường ở phần nước chan. Đun sôi rồi hạ lửa nhỏ cho sôi thật nhẹ cho cạn bớt nước hơi sánh chút xíu xíu.',
    },
    {
      title: 'Bước 4: Nặn bánh',
      content:
        'Bắc một nồi nước đun sôi. Lấy một miếng bột ấn dẹt trong lòng tay cho nhân vào rồi bao viên lại và thả vào nồi nước sôi. Tiếp tục nặn viên khác và thả vào nồi. Vỏ bao kín nhân không để có không khí bên trong nếu không bánh sẽ vỡ. Khi viên bột nổi lên là chín. Để thêm vài phút rồi vớt ra. Khi thả bột vào nồi khuấy nhẹ chút cho bột khỏi dính đáy',
    },
    {
      title: 'Bước 5: Thưởng thức',
      content:
        'Khi ăn cho bánh vào bát chan nước gừng nóng, rắc lạc và dừa sợi lên trên. Món ăn phải dùng nóng mới ngon.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=kP3K63hr01c',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Chả rươi'), {
  title: 'Chả rươi',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://static.vinwonders.com/production/cha-ruoi-ha-noi-4.jpg',
    'https://static.vinwonders.com/production/cha-ruoi-ha-noi-6.jpg',
    'https://static.vinwonders.com/production/cha-ruoi-ha-noi-2.jpg',
    'https://static.vinwonders.com/production/cha-ruoi-ha-noi-10.jpg',
    'https://static.vinwonders.com/production/cha-ruoi-ha-noi-11.jpg',
    'https://static.vinwonders.com/production/cha-ruoi-ha-noi-14.jpg',
  ],

  introduce:
    'Món sủi dìn là thức ăn đường phố vào mùa đông, là món ăn nóng hổi bắt nguồn từ cộng đồng người Hoa ở Hải Phòng xưa, lấy cảm hứng từ món bánh trôi nước.',
  ingredientList: [
    '500gr rươi tươi (hoặc rươi đông lạnh)',
    '100gr thịt vai xay',
    '1 quả trứng gà',
    '1/3 vỏ quả quýt phơi khô',
    'Hành lá, thì là, lá lốt',
    'Gia vị: Nước mắm, tiêu, dầu ăn',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Rửa sạch rươi bằng cách đổ nước nóng khoảng 65-70 độ C vào rươi và dùng đũa khuấy đều để loại bỏ đi những cặn bẩn và làm rụng lông rươi, sau đó rửa sạch lại với nước lạnh. Hành lá, thì là và lá lốt rửa sạch rồi thái nhỏ. Vỏ quýt sau khi ngâm với nước nóng và bóp qua nhiều lần để giảm đi lượng tinh dầu có trong vỏ quýt thì đem đi băm nhỏ.',
    },
    {
      title: 'Bước 2: Làm chả rươi',
      content:
        'Cho rươi đã sơ chế vào tô, thêm 1 muỗng canh nước mắm vào rồi đánh đều với rươi. Sau đó bạn tiếp tục cho vào 100gr thịt vai xay, 1 trái trứng gà cùng 1 muỗng cà phê tiêu xay vào rồi trộn đều các nguyên liệu lại với nhau. Cuối cùng cho tất cả phần hành lá, thì là và lá lốt đã thái nhỏ vào rồi khuấy hỗn hợp cho đều.',
    },
    {
      title: 'Bước 3: Chiên chả rươi',
      content:
        'Làm nóng dầu ăn sau đó lấy một lượng rươi vừa phải hoặc một lượng tùy theo ý muốn của bạn cho vào chảo để chiên, chiên chả rươi ở lửa vừa để chả không bị cháy. Lật các mặt của chả rươi lại chiên cho tới khi thấy chả có một màu vàng đều và đẹp, ngửi thấy thơm thì lấy ra, không chiên chả quá lâu sẽ làm chả khô hơn.',
    },
    {
      title: 'Bước 4: Thành phẩm',
      content:
        'Sau hoàn thành hãy thưởng thức khi còn nóng. Hương vị đậm đà, ngon miệng của những chiếc chả rươi vàng ruộm độc đáo tạo nên một món ăn tuyệt vời!',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=BfRxXz972ng',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Bánh đa cua'), {
  title: 'Bánh đa cua',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://statics.vinpearl.com/banh-da-cua-ha-noi-4_1680941254.jpg',
    'https://statics.vinpearl.com/banh-da-cua-ha-noi-7_1680941572.jpg',
    'https://statics.vinpearl.com/banh-da-cua-ha-noi-9_1680941958.jpg',
    'https://statics.vinpearl.com/banh-da-cua-ha-noi-1_1680940620.jpg',
    'https://statics.vinpearl.com/banh-da-cua-ha-noi-2_1680940820.jpg',
  ],

  introduce:
    'Bánh đa cua là món ăn nổi tiếng, là nét văn hóa đặc trưng của ẩm thực thành phố Hải Phòng. Bánh đa cua Hải Phòng sử dụng sợi bánh đa đỏ, sợi bánh dẹt, dai, không dễ bị bở hay nát như phở, miến.',
  ingredientList: [
    'Bánh đa đỏ/ bánh đa trắng tùy sở thích: 400 gram',
    'Cua đồng xay 400 gram',
    'Sườn sụn 300 gram',
    'Thịt lợn xay 150 gram',
    'Hành khô, mộc nhĩ, lá lốt, cà chua,...',
    'Gia vị: Nước mắm, muối, tiêu, hạt nêm...n',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Rửa sạch mỡ phần và thái hạt lựu. Ngâm tôm khô trong 1 bát nước ấm cho nở ra và sau đó rửa sạch. Mộc nhĩ ngâm vào nước ấm khoảng 15 phút và rửa sạch, bỏ chân sau đó thái sợi. Rửa sạch lá lốt, lựa lá to để làm chả lá lốt, lá nhỏ thì thái nhỏ trộn cùng với thịt xay. Rửa sạch cà chua, bổ múi cau. Hành khô bóc vỏ và thái mỏng, hành lá, rau sống và mùi tàu nhặt và rửa sạch với 2 - 3 lần nước, thái nhỏ. Nếu sử dụng bánh đa khô, bạn hãy ngâm bánh đa trong nước khoảng 5 phút để chúng nở đều.',
    },
    {
      title: 'Bước 2: Luộc sườn và làm riêu',
      content:
        'Rửa sạch sườn, cho vào nồi cùng nước lạnh, đun sôi khoảng 2 - 3 phút thì tắt và đổ phần nước đi, rửa sạch sườn dưới vòi nước một lần nữa. Cho sườn lại vào nồi, thêm 2 lít nước vào và đun nhỏ lửa từ 30 - 40 phút. Bạn có thể nướng 2 -3 củ hành khô và cho vào để sườn được khử mùi và thơm hơn. Cho phần cua xay vào một bát nước lớn, khuấy và bóp nhẹ thịt cua bằng tay để chúng hòa đều với nước, lặp lại bước này 1 - 2 lần. Sau đó, dùng rây lọc lấy loại bỏ phần vỏ cứng, lấy nước cua và đun sôi.',
    },
    {
      title: 'Bước 3: Đun nước lọc cua và lấy gạch',
      content:
        'Sau khi nồi nước lọc cua vào nồi, thêm vào đó 1 chút muối và dùng đũa khuấy nhẹ cho tới khi nước có vẩn đục của riêu cua nổi lên thì ngừng. Sau khi sôi, gạch cua sẽ nổi lên bề mặt, bạn hãy dùng muôi múc phần riêu này ra một chiếc bát, phần nước cua sẽ tiếp tục được dùng để nấu nước dùng.',
    },
    {
      title: 'Bước 4: Làm chả lá lốt',
      content:
        'Trộn đều thịt xay với mộc nhĩ thái sợi và lá lốt thái nhỏ, nêm vào ½ thìa café hạt nêm và 5 gram hành khô cùng 1 muống café tiêu. Để hỗn hợp nghỉ khoảng 5 phút cho ngấm gia vị. Trải lá lốt đã rửa sạch ra mặt phẳng (mặt lá bóng úp xuống dưới). Lấy một lượng thịt vừa đủ  đặt lên mặt lá, dàn đều và cuộn tròn, dùng cuống lá hoặc tăm nhọn găm lại để cố định chả. Cho dầu ăn lên chảo, khi dầu nóng lăn tròn các miếng chả trên chảo và rán lửa vừa cho tới khi xém đều và cho ra đĩa.',
    },
    {
      title: 'Bước 5: Làm tóp mỡ và chả cá',
      content:
        'Làm nóng chảo, cho phần mỡ được thái hạt lựu vào chảo và đảo đều (không đậy vung), đảo đến khi mỡ tóp lại và xém thì bỏ phần tóp mỡ ra đĩa, sau đó thêm hành khô đã cắt miếng vào phần mỡ thừa vừa làm xong, khi hành hơi ngả màu vàng thì lập tức tắt bếp và vớt ra để ráo. Chắt bớt mỡ trong chảo ra, chỉ để lại khoảng 15ml trong chảo và cho phần gạch cua vào đảo đều, sao đó thêm tóp mỡ và hành phi vào. Khi gạch chín thì bỏ ra một chiếc bát.',
    },
    {
      title: 'Bước 6: Chế biến nước dùng bánh đa',
      content:
        'Sau khi sườn chín mềm, vớt sườn ra một chiếc bát để riêng, sau đó đổ phần nước lọc cua vào nồi nước sườn, thêm 2 lít nước vào, đun sôi. Khi sôi trụng tôm khô vào nồi cho mềm và vớt ra. Sau đó, thêm cà chua đã xào vào cùng và nêm thêm nước mắm và hạt nêm sao cho vừa ăn. Trụng sơ bánh đa với nước sôi cho chín tới (dùng một nồi nước riêng), sau đó cho vào tô, thêm chả lá lốt, gạch cua, tôm, rau muống, hành và mùi ăn kèm vào, sau đó chan nước dùng vào bánh đa.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=vpFPeerlv84',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Hủ tiếu'), {
  title: 'Hủ tiếu',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://digifood.vn/blog/wp-content/uploads/2021/08/hu-tieu-ha-noi.jpg',
    'https://digifood.vn/blog/wp-content/uploads/2021/08/hu-tieu-co-tuan.jpeg',
    'https://digifood.vn/blog/wp-content/uploads/2021/08/hu-tieu-ha-noi-2.jpg',
    'https://digifood.vn/blog/wp-content/uploads/2021/08/hu-tieu-1.jpg',
    'https://digifood.vn/blog/wp-content/uploads/2021/08/hu-tieu-2.jpg',
  ],

  introduce:
    'Hủ tiếu còn được viết là hủ tíu là món ăn dùng chế phẩm gạo dạng sợi của người Triều Châu và người Mân Nam được truyền nhập tới nhiều vùng ở trong và ngoài nước Trung Quốc, trở thành món ăn thường gặp ở vùng Đông Nam Á như ở miền Nam Việt Nam, Campuchia, Lào, Thái Lan. Hủ tiếu phát triển rất mạnh ở miền Nam Việt Nam từ những năm 50, đặc biệt là tại Sài Gòn.',
  ingredientList: [
    '1 tim heo',
    '1 miếng gan heo',
    '200g tôm',
    '300g mỡ heo',
    '400g xương đuôi heo',
    '200g thịt bằm',
    '1-2 con khô mực, 10 con tôm khô',
    'Trứng cút',
    'Hành tím, tỏi, giá đỗ, hẹ',
    'Gia vị: Hạt nêm, bột ngọt, đường phèn, đường, tiêu, dầu ăn, giấm, dầu hào, nước tương, hắc xì dầu, tương ớt, tương đen, bột bắp, dầu mè, muối',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Đối với xương heo, bạn nấu một nồi nước sôi và rót vào xương heo chần sơ để lấy đi hết tất cả cặn bẩn. Việc làm này giúp khi nấu nước lèo sẽ trong hơn. Củ cải trắng thì bạn gọt sạch vỏ ngoài và cắt thành khúc khoảng 5cm là được. Khô mực mua về bạn đem nướng để khi nấu sẽ ra nhiều nước ngọt hơn nhé. Hành tím và tỏi bạn lột sạch vỏ, rồi băm nhỏ vừa phải. Trứng cút bạn luộc rồi lột vỏ.',
    },
    {
      title: 'Bước 2: Nấu nước lèo',
      content:
        'Bạn bắc một nồi có 3 lít nước lên bếp, lần lượt cho xương heo, củ cải trắng, khô mực nướng, tôm khô, tim heo vào. Sau đó bạn nêm vào nồi 2 muỗng cà phê hạt nêm, ⅓ muỗng bột ngọt, 1 muỗng canh đường phèn. Bạn nấu các nguyên liệu này trong khoảng 17-18 phút. Sau khi tim heo chín, bạn cho gan heo vào nấu trong khoảng 13-14 phút. Sau khi tim và gan heo đều chín, bạn vớt ra và cho tôm vào nấu. Đến khi tôm chín, bạn cũng vớt tôm ra nhé. ',
    },
    {
      title: 'Bước 3: Thắng tóp mỡ',
      content:
        'Trong lúc chờ nước lèo, bạn cho mỡ heo vào một cái chảo thắng ở lửa trung bình đến khi mỡ ra dầu. Đến lúc bạn thấy mỡ heo ra hết dầu và trở nên giòn và vàng hơn thì đổ qua một cái rây để lọc dầu và tóp mỡ ra riêng nhé.',
    },
    {
      title: 'Bước 4: Xào thịt băm',
      content:
        'Bạn dùng lại cái chảo vừa thắng tóp mỡ, cho vào một ít dầu mỡ heo mới làm rồi cho hành tím băm vào phi thơm. Khi hành tím đã vàng thơm và giòn thì bạn cho thịt băm vào, nêm 1 muỗng cà phê hạt nêm, một xíu bột ngọt (nếu bạn không thích ăn bột ngọt thì có thể bỏ qua), ½ muỗng cà phê đường. Dùng đũa đảo đều thịt băm đến khi chín trên lửa trung bình. Khi thịt chín bạn cho thêm tiêu.',
    },
    {
      title: 'Bước 5: Làm xốt trộn hủ tiếu',
      content:
        'Bạn cho vào nồi 1 muỗng canh dầu ăn, lắc đều nồi sao cho dầu lan khắp đáy nồi và nóng dầu lên. Sau đó bạn cho một ít hành tím băm vào phi sơ trước một lúc rồi cho tỏi vào phi cùng. au khi hành tím và tỏi đã thơm, bạn cho vào 1 chén nước lọc rồi cho thêm đường, dầu hào, nước tương, hắc xì dầu, tương ớt, tương đen, canh giấm. Sau đó bạn pha 1 muỗng canh bột bắp với nước, khuấy đều cho bột tan ra rồi cho vào nước xốt để xốt được đậm đặc hơn. Cuối cùng bạn cho 1 muỗng canh dầu mè vào. Bạn rắc một ít tiêu vào xốt, tắt bếp và để xốt nguội.',
    },
    {
      title: 'Bước 6: Thành phẩm',
      content:
        'Khi trộn, đầu tiên bạn cho 1 muỗng canh dầu tỏi vào hủ tiếu, trộn đều lên. Sau đó bạn cho khoảng 2 muỗng canh xốt trộn hủ tiếu, giá hẹ, tim heo, tôm, gan heo, tóp mỡ, thịt băm, 2 trứng cút và và trộn lên.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=fziqSn-xkws',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Cá kho tộ'), {
  title: 'Cá kho tộ',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://cdn.tgdd.vn/2021/02/CookRecipe/Avatar/ech-xao-la-cach-nuoc-cot-dua-thumbnail.jpg',
    'https://cdn.tgdd.vn/2020/09/CookRecipe/GalleryStep/thanh-pham-583.jpg',
    'https://cdn.tgdd.vn/Files/2019/09/02/1194292/cach-lam-ca-loc-kho-to-ngon-com-chuan-vi-mien-nam-202201041313092690.jpg',
    'https://cdn.tgdd.vn/Files/2019/09/02/1194292/cach-lam-ca-loc-kho-to-ngon-com-chuan-vi-mien-nam-202208301450142980.jpg',
    'https://cdn.tgdd.vn/Files/2019/09/02/1194292/cach-lam-ca-loc-kho-to-ngon-com-chuan-vi-mien-nam-202201041358059116.jpg',
  ],

  introduce:
    'Cá kho tộ vốn là món ăn dân dã của người dân vùng sông nước miền tây nam bộ. Thường xuất hiện trong bữa cơm hàng ngày của nhiều gia đình, những niêu cá kho chinh phục người ăn bằng hương vị đậm đà, béo ngậy, thơm ngon và đặc biệt “tốn cơm”.',
  ingredientList: [
    '1kg cá basa tươi (hoặc cá basa đã khúc sẵn)',
    '250g thịt ba rọi',
    '1 quả dừa',
    'Bột mì hoặc bột năng',
    '400g xương đuôi heo',
    'Rượu gừng, giấm, chanh',
    'Tỏi, ớt, hành tím băm, hành lá, thì là',
    'Gia vị: Nước mắm, muối, đường, tiêu, dầu ăn, xì dầu',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế cá basa',
      content:
        'Bạn làm sạch cá bằng cách chặt bỏ vây, mổ bỏ nội tạng, tách bỏ mang, cạo sạch màng đen bên trong bụng cá. Sau đó, bạn dùng bột mì hoặc bột năng để loại bỏ lớp nhớt trên cá rồi lấy khăn sạch lau từ đầu xuống đuôi. Tiếp theo là dùng rượu gừng, muối hoặc giấm, chanh chà xát lên thân cá, cả bên trong và bên ngoài để khử mùi tanh triệt để. Cuối cùng là rửa lại thật sạch với nước. Bạn lấy dao chặt cá thành khúc khoảng 5cm rồi ướp cá theo tỷ lệ 1 thìa cà phê xì dầu, 1 thìa cà phê muối, ½ thìa cà phê tiêu, 1 - 3 thìa cà phê đường, 3 thìa canh nước mắm, 1 thìa canh dầu ăn và ớt băm và đợi cho gia vị thấm trong 1 giờ',
    },
    {
      title: 'Bước 2: Sơ chế các nguyên liệu khác',
      content:
        'Rửa sạch thịt ba rọi, cạo bì và thái miếng vuông. Bạn rửa hành, thì là và thái nhỏ. Lấy một tô khuấy tan đều hỗn hợp 1 muỗng canh xì dầu, 1 muỗng canh nước mắm và đổ cả nước dừa.',
    },
    {
      title: 'Bước 3: Chế biến món cá kho tộ',
      content:
        'Bạn bắc chảo lên bếp, cho dầu ăn tới khi nóng thì cho hành, tỏi, ớt băm vào phi thật thơm rồi thêm thịt ba chỉ vào đảo đến khi gần chín thì tắt bếp. Kết hợp độ béo ngậy của thịt ba chỉ kho cùng cá sẽ tăng sự hấp dẫn của món ăn hơn. Xếp các khúc cá vào niêu đất hoặc nồi sau đó để lớp thịt chỉ phía trên. Bạn nhớ đổ cả phần nước ướp vào niêu. Sau đó bạn đổ hỗn hợp xì dầu, nước mắm và nước dừa trên rồi đậy nắp vung lại để nấu. Đặt niêu lên bếp nấu với lửa vừa. Khi niêu sôi thì hạ lửa liu riu và kho trong 1 tiếng. Nêm nếm gia vị sao cho phù hợp với gia đình bạn và nấu cho tới khi niêu cá còn xâm xấp nước.',
    },
    {
      title: 'Bước 4: Thành phẩm',
      content:
        'Trước khi tắt bếp thì bạn cho hành lá và thì là lên phía trên bề mặt rồi nhấc xuống bếp là có thể thưởng thức ngay với cơm nóng.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=BfD1KwGwkqA',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Kho quẹt'), {
  title: 'Kho quẹt',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/kho-quet-cong-thuc-duoc-chia-se-tu-nguoi-dung-thumbnail-1.jpg',
    'https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/thanh-pham-860.jpg',
    'https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/thanh-pham-861.jpg',
    'https://nguyenkim.com/images/companies/_1/Content/tin-tuc/nha-bep/vao-bep/cach-lam-kho-quet-chuan-vi-nam-bo-ngon-ngat-ngay-06.jpg',
    'https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/kinh-nghiem-meo-hay/n%E1%BA%A5u%20%C4%83n/FB_IMG_1610688892549.jpg.jpg',
    'https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/kinh-nghiem-meo-hay/n%E1%BA%A5u%20%C4%83n/nhung-tieu-chi-tien-quyet-de-co-mon-kho-quet-sieu-ngon-cho-bua-com-gia-dinh%204.jpg.jpg',
  ],

  introduce:
    'Kho quẹt được xuất phát và chế biến những lần đầu tiên bởi thói quen ăn uống "đại khái" của người dân miền tây sông nước, cụ thể là những người làm nông. Vào những ngày mưa dai dẳng, không thể ra đồng, nên người dân dùng đại những thứ có trong nhà như tóp mỡ, tôm tép khô, cùng với gia vị là nước mắm, muối, bột ngọt,… nấu thành một hỗn hợp sền sệt, rồi ra vườn hái vội một hai nắm rau luộc lên ăn với cơm trắng.',
  ingredientList: [
    '150g thịt ba chỉ',
    '50g tôm khô',
    'Vài củ hành tím và vài tép tỏi, ớt',
    'Gia vị: Nước mắm, đường, dầu ăn, tiêu',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Tôm khô ngâm trong nước ấm khoảng 15 phút để tôm khô mềm. Thịt ba chỉ rửa sạch rồi cắt miếng vừa ăn. Cho 5 muỗng canh đường, 6 thìa canh nước mắm, 4 thìa canh nước lọc vào tô khuấy đều đến khi đường tan hết.',
    },
    {
      title: 'Bước 2: Rang thịt',
      content:
        'Cho thịt vào nồi rang cho đến khi thịt ra mỡ, chín vàng giòn, ngon thì vớt thịt ra ngoài.',
    },
    {
      title: 'Bước 3: Làm kho quẹt',
      content:
        'Cho hành tím cắt nhỏ vào nồi đất đặt bếp để phi vàng, tôm khô sau khi ngâm, rửa sạch, để ráo nước rồi cho vào nồi đất phi vàng. Khi tôm đã phi vàng, bạn cho thịt ba chỉ vừa rang vào nồi đảo đều với tôm rồi cho ½ thìa cà phê bột nêm vào và trộn đều hỗn hợp. Tiếp theo đổ hỗn hợp nước, nước mắm và đường vào nồi kho với ngọn lửa nhỏ cho tới khi nước keo và sệt lại thì bạn thêm hành tiêu, ớt và tiêu xanh (nếu có) vào nồi và tắt bếp.',
    },
    {
      title: 'Bước 4: Thành phẩm',
      content:
        'Món thịt kho quẹt này có đặc trưng là phần nước sốt keo đặc lại, có vị mặn ngọt đậm đà và ấm nồng của tiêu ớt. Tôm khô thì thấm vị, thịt mỡ được rang vàng giòn. Món ăn này ăn cùng với rau luộc và cơm nóng thì tốn cơm vô cùng luôn đấy.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=bXBg1bf9gj0',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Cháo cá lóc'), {
  title: 'Cháo cá lóc',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://cdn.tgdd.vn/Files/2017/05/17/983325/cach-nau-chao-ca-loc-rau-dang-dam-chat-mien-tay-202002250947321647.jpg',
    'https://cdn.tgdd.vn/Files/2017/05/17/983325/cach-nau-chao-ca-loc-rau-dang-dam-chat-mien-tay-202201031015144883.jpg',
    'https://cdn.hellobacsi.com/wp-content/uploads/2021/10/cach-nau-chao-ca-loc-2.jpg',
    'https://cdn.hellobacsi.com/wp-content/uploads/2021/10/chao-ca-loc.jpg',
    'https://statics.vinpearl.com/chao-ca-loc--_1628433517.jpg',
    'https://statics.vinpearl.com/Hinh-anh-mem-thom-chao-ca-loc-can-tho-tinh-tuy-am-thuc-mien-tay4_1628428268.jpg',
  ],

  introduce:
    'Cá lóc là loại cá phổ biến với người miền Tây, các món ngon từ cá lóc luôn mang một nét mộc mạc và quen thuộc của người xứ này như canh chua cá lóc, cá lóc nướng trui, cá lóc kho tộ,... Nhưng có một món mà gia đình người dân miền Tây đều thân thuộc dù cách chế biến đơn giản nhưng mang hương vị rất riêng đó chính là cháo cá lóc rau đắng - món ăn chứa đựng cái chân chất, thật thà hệt người miền Tây.',
  ingredientList: [
    '100g gạo',
    '300g cá lóc đồng (nếu không có thì dùng cá lóc thường)',
    '1 muỗng canh tỏi băm',
    '1 muỗng canh hành tím băm',
    '50g nấm rơm',
    '20g góc hành',
    '200g rau đắng',
    'Gia vị: 1 muỗng canh hạt nêm, 1 muỗng canh đường, 1 muỗng canh nước mắm',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Đầu tiên, rang gạo trên bếp để cháo có mùi thơm hơn. Còn gừng cắt lát mỏng, cá lóc thì đem đi xát muối và gừng để khử mùi tanh của cá, rửa sạch lại với nước, sau đó chặt thành khúc vừa ăn.',
    },
    {
      title: 'Bước 2: Chiên sơ cá',
      content:
        'Phi thơm hành và tỏi trên bếp, rồi cho cá vào chiên sơ cho săn. Sau đó, cho nấm rơm vào đảo sơ khoảng 5 phút cho thơm.',
    },
    {
      title: 'Bước 3: Nấu cháo',
      content:
        'Cá lóc sau khi chiên sơ thì cho vào nồi cùng 1 lít nước, nấu đến khi vừa chín đủ thì vớt ra để tránh bị nát. Sau đó, thêm gạo đã rang vàng vào nồi đã nấu cá lóc để cháo thơm và ngọt hơn. Ta sẽ nấu chín đến khi mềm.',
    },
    {
      title: 'Bước 4: Hoàn thành cháo cá lóc rau đắng',
      content:
        'Khi cháo đã mềm thì cho nấm rơm vào nấu cùng, nêm gia vị với lượng hạt nêm, đường và nước mắm đã chuẩn bị sẵn. Sau đó, cho thêm đầu hành vào để nồi cháo cá lóc thêm phần thơm ngon và hấp dẫn nhé.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=3eY5Rdv7j2w',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Canh chua cá lóc'), {
  title: 'Canh chua cá lóc',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://www.disneycooking.com/wp-content/uploads/2020/04/canh-chua-ca-loc.jpg',
    'https://www.disneycooking.com/wp-content/uploads/2020/04/cach-nau-canh-chua-ca-loc-don-gian.jpg',
    'https://www.disneycooking.com/wp-content/uploads/2020/04/cach-nau-canh-chua-ca-loc-mien-trung.jpg',
    'https://cdn.tgdd.vn/Files/2021/02/26/1330794/10-cach-nau-canh-chua-thom-ngon-de-lam-an-bao-nhieu-com-cung-het-202102261456401680.jpg',
    'https://cdn.tgdd.vn/2021/05/CookRecipe/GalleryStep/2.9(3).jpg',
    'https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/canh-chua-ca-loc-cong-thuc-duoc-chia-se-tu-nguoi-dung-thumbnail-1.jpg',
  ],

  introduce:
    'Món canh chua cá lóc là một món ăn dân dã, phổ biến và đậm đà trong ẩm thực Việt Nam, đặc biệt là ở vùng Tây Nam Bộ. Món canh này thường được người dân ưa thích vào những ngày hè nóng bức để giúp giảm nhiệt độ và khát khao trong mùa hè oi bức. Nó được gọi là "canh chua" vì có vị chua thanh mát đặc trưng từ dưa chua hoặc có thể có vị ngọt đậm đà từ nước dừa.',
  ingredientList: [
    'Cá lóc: 1 con 800g',
    'Bạc hà (dọc mùng): 2 cây',
    'Dứa: ½ quả',
    'Cà chua: 3 quả',
    'Me chua: 2 quả',
    'Đậu bắp: 10 trái',
    '2 quả ớt sừng đỏ',
    'Giá đỗ: 150g',
    'Tỏi băm, hành tím phi, ngò gai, rau om',
    'Gia vị: đường, muối, hạt nêm, nước mắm, bột ngọt, dầu ăn',
  ],
  steps: [
    {
      title: 'Bước 1: Sơ chế nguyên liệu',
      content:
        'Cá lóc mua về làm sạch ruột, bóc mang, đánh vảy. Để khử bớt mùi tanh và nhớt của cá, bạn sử dụng muối và 1 quả chanh cắt lát chà xát nhẹ lên mình cá rồi rửa sạch. Cắt thành lát vừa ăn. Ướp cá với một chút muối, hạt nêm và hành tím băm nhỏ trong khoảng 20 phút cho thấm gia vị. Đậu bắp cắt bỏ đầu đuôi cắt miếng vừa ăn, dứa rửa sạch thái miếng mỏng. Dọc mùng tước vỏ, thái lát mỏng, bóp sạch với muối. Cà chua rửa sạch và bổ múi cau, me ngâm nước ấm và chắt lấy nước bỏ hạt. Tỏi lột vỏ và băm nhuyễn, ớt cắt lát mỏng.',
    },
    {
      title: 'Bước 2: Nấu canh',
      content:
        'Bật bếp cho vào nồi ít dầu phi thơm 1 củ hành và 2 nhánh tỏi băm nhỏ, lúc này bạn cho cá vào và trở nhẹ, khi thịt cá săn lại bạn đổ thêm lượng nước vừa đủ ăn. Đồng thời cho thêm dứa, cà chua và nước me đã sơ chế sẵn. Khi sôi bạn nêm nếm gia vị vừa ăn và vớt bọt để nước canh được trong, thêm đậu bắp cùng dọc mùng và đun sôi thêm 2-3 phút. Cho thêm giá đỗ, ngò gai cắt nhỏ rồi tắt bếp.',
    },
    {
      title: 'Bước 3: Thành phẩm',
      content:
        'Cá lóc sau khi chiên sơ thì cho vào nồi cùng 1 lít nước, nấu đến khi vừa chín đủ thì vớt ra để tránh bị nát. Sau đó, thêm gạo đã rang vàng vào nồi đã nấu cá lóc để cháo thơm và ngọt hơn. Ta sẽ nấu chín đến khi mềm.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=jqISaQo4ltU',
});
await setDoc(doc(FIREBASE_DB, 'foods', 'Cơm cháy chà bông'), {
  title: 'Cơm cháy chà bông',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://image.vtc.vn/resize/th/upload/2022/05/23/3143comchaychabong-11553864.jpg',
    'https://image.vtc.vn/resize/th/upload/2022/05/23/top-7-thuong-hieu-com-chay-ninh-binh-ngon-chuan-cua-chinh--1640701272-11562364.jpg',
    'https://cdn.tgdd.vn/Files/2017/07/04/999480/cach-lam-com-chay-cha-bong-thom-ngon-gion-cay-tai-nha-202209061542391773.jpg',
    'https://cdn.tgdd.vn/Files/2017/07/04/999480/cach-lam-com-chay-cha-bong-thom-ngon-gion-cay-tai-nha-202209061540080116.jpg',
    'https://cdn.tgdd.vn/Files/2017/07/04/999480/cach-lam-com-chay-cha-bong-thom-cay-gion-rum-202202282314547434.jpg',
  ],

  introduce:
    'Cơm cháy Ninh Bình là một trong những món ăn đặc sản ẩm thực nổi tiếng của Ninh Bình. Cơm cháy được cho là đã tồn tại hơn 100 năm. Tương truyền vào thời Pháp thuộc, có chàng thanh niên tên Đinh Hoàng Thăng đã sáng tạo ra món ăn này dựa trên những kinh nghiệm có được sau nhiều năm làm công cho quán ăn của người Hoa. Qua thời gian, người dân địa phương lại chắt lọc thêm những bí quyết riêng để đặc sản quê hương ngày càng thơm ngon.',
  ingredientList: [
    'Gạo nếp: 125g',
    'Gạo tẻ: 125g',
    'Ruốc thịt heo: 100g',
    'Hành lá',
    'Dầu ăn, nước mắm, đường, muối, ớt bột.',
  ],
  steps: [
    {
      title: 'Bước 1:  Làm cơm cháy',
      content:
        'Trộn đều gạo và gạo nếp với nhau. Cho vào nồi cơm điện, vo sạch, đổ nước xâm xấp mặt rồi nấu chín. Sau khi cơm chín thì xúc cơm ra khay và dàn đều. Mách nhỏ bạn là dùng tay quét qua dầu ăn rồi ép cơm xuống hoặc dùng li thủy tinh lăn qua để cơm được dàn đều và ép chặt. Cho vào tủ lạnh để qua đêm. Sau khi cơm đã se khô và hơi cứng lại, bạn cắt cơm thành từng miếng nhỏ. Cuối cùng bạn chiên ngập dầu với lửa nhỏ phần cơm đã sấy cho đến khi vàng đều cả hai mặt rồi bỏ vào đĩa có lót sẵn giấy ăn.',
    },
    {
      title: 'Bước 2: Làm nước mắm, mỡ hành',
      content:
        'Pha nước mắm theo công thức:  3 muỗng canh đường, pha với 3 muỗng canh nước mắm, 3 muỗng canh nước lọc, 1 muỗng canh ớt bột. Phi hành lá trong dầu cho đến khi hành lá chuyển sanh màu xanh đậm và có mùi thơm là được.',
    },
    {
      title: 'Bước 3: Thành phẩm',
      content:
        'Đặt từng miếng cơm cháy lên một chiếc mâm. Rưới nước mắm đã pha lên trên mặt miếng cơm cháy, phết thêm một lớp mỡ hành. Cuối cùng bạn rải một ít chà bông nữa là hoàn thành.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=i0DCgO-shsw',
});

await setDoc(doc(FIREBASE_DB, 'foods', 'Bánh căn'), {
  title: 'Bánh căn',
  subTitle: 'Vietnamese traditional dish',
  imageUrlList: [
    'https://cdn.tgdd.vn/Files/2022/05/31/1436004/cach-lam-banh-can-mien-trung-don-gian-chuan-vi-que-huong-202205310712504242.jpg',
    'https://cdn.tgdd.vn/Files/2022/05/31/1436004/cach-lam-banh-can-mien-trung-don-gian-chuan-vi-que-huong-202205310713038137.jpg',
    'https://cdn.tgdd.vn/Files/2022/05/31/1436004/cach-lam-banh-can-mien-trung-don-gian-chuan-vi-que-huong-202205310707582924.jpg',
    'https://cdn.tgdd.vn/2021/04/content/phanthietbanh-can-phan-thiet-03(1)-800x540.jpg',
    'https://cdn.tgdd.vn/2021/04/content/bc6-800x450-1.jpg',
    'https://cdn.tgdd.vn/2021/04/content/bancan-8-800x450.jpgs',
  ],

  introduce:
    'Cơm cháy Ninh Bình là một trong những món ăn đặc sản ẩm thực nổi tiếng của Ninh Bình. Cơm cháy được cho là đã tồn tại hơn 100 năm. Tương truyền vào thời Pháp thuộc, có chàng thanh niên tên Đinh Hoàng Thăng đã sáng tạo ra món ăn này dựa trên những kinh nghiệm có được sau nhiều năm làm công cho quán ăn của người Hoa. Qua thời gian, người dân địa phương lại chắt lọc thêm những bí quyết riêng để đặc sản quê hương ngày càng thơm ngon.',
  ingredientList: [
    '200g tôm',
    '200g bột gạo',
    '10 trái trứng cút',
    '100g bột năng',
    '100g đu đủ bào sợi',
    '20g hành lá cắt nhuyễn',
    'Tỏi băm, hành tím băm, ớt băm',
    'Gia vị: Bột nghệ, giấm, nước mắm, dầu ăn, muối, đường, tiêu, hạt nêm, giấm trắng, nước cốt chanh',
    'Dụng cụ: Chảo khuôn đổ bánh căn (khuôn đổ bánh khọt), tô, dĩa, dao, muỗng, đũa, giấy thấm dầu..',
  ],
  steps: [
    {
      title: 'Bước 1: Pha bột đổ bánh căn',
      content:
        'Đầu tiên, bạn cho vào một tô lớn 200g bột gạo, 100g bột năng, 1 muỗng cà phê bột nghệ, 1 muỗng cà phê hạt nêm, 1 muỗng cà phê muối, ½ muỗng cà phê hạt tiêu và 450ml nước, khuấy đều để hỗn hợp hòa quyện với nhau rồi cho tiếp khoảng 20g hành lá cắt nhuyễn, khuấy nhẹ và để bột nghỉ 1 tiếng.',
    },
    {
      title: 'Bước 2: Sơ chế và ướp tôm',
      content:
        'Kế tiếp, bạn đem 200g tôm đi rửa sạch với nước lạnh, vớt ra để ráo, đem bỏ phần đầu và vỏ tôm đi rồi dùng dao rạch phần sống lưng để rút chỉ đen trên lưng tôm. Sau đó, bạn tiến hành ướp tôm với 1 muỗng cà phê hạt nêm, 1 muỗng cà phê đường, 1 muỗng cà phê nước mắm, ½ muỗng cà phê tiêu, 1 muỗng cà phê hành tím băm, 1 muỗng cà phê tỏi băm, trộn đều và để tôm trong ngăn mát tủ lạnh khoảng 30 phút.',
    },
    {
      title: 'Bước 3: Làm đu đủ chua ngọt ăn kèm',
      content:
        'Bước tiếp theo, bạn cho lần lượt vào chén 2 muỗng canh giấm trắng và 2 muỗng canh đường, khuấy đều để hỗn hợp tan với nhau rồi cho tiếp 100g đu đủ bào sợi vào chén, sau đó để như vậy khoảng 1 tiếng để đu đủ ngấm đều gia vị.',
    },
    {
      title: 'Bước 4: Làm nước chấm ăn kèm',
      content:
        'Để làm nước mắm chua ngọt ăn kèm với bánh căn, bạn cho lần lượt vào chén 10 muỗng canh nước mắm, 10 muỗng canh đường, 20 muỗng canh nước lọc, 1 muỗng canh nước cốt chanh, 1 muỗng canh ớt băm và 1 muỗng canh tỏi băm, sau đó khuấy đều hỗn hợp nước mắm chua ngọt.',
    },
    {
      title: 'Bước 5: Đổ bánh căn',
      content:
        'Bắc loại chảo có khuôn để đổ bánh căn lên bếp, sau đó bạn cho ngập dầu ăn vào các khuôn bánh trong chảo và đun dầu nóng ở mức lửa nhỏ. Khi dầu đã sôi, bạn cho lần lượt vào các khuôn phần bột đã pha ở trên, trứng cút được đập vỡ và 1 - 2 con tôm, đậy nắp rồi tiếp tục chiên bánh trong khoảng 2 phút. Khi mở nắp ra, bạn chiên bánh căn thêm khoảng 2 phút nữa, đến khi bánh vàng đều và tôm lẫn trứng cút đều đã chín hết thì bạn gắp bánh ra dĩa có lót giấy thấm dầu.',
    },
  ],
  videoLink: 'https://www.youtube.com/watch?v=Jip89mtvJNs',
});
