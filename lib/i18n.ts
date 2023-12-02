import { I18n } from 'i18n-js';
import viVn from 'i18n-js/json/vi.json';
import enUs from 'i18n-js/json/en-US.json';

type Translations = {
  other: {
    appName: string;
    continueWith: string;
    errorOccur: string;
    goBack: string;
    refreshing: string;
  };
  register: RegisterTranslations;
  login: LoginTranslations;
  support: SupportTranslations;
  settings: SettingsTranslations;
  about: AboutTranslations;
  home: HomeTranslations;
  information: InformationTranslations;
  sidebar: SidebarTranslations;
  games: GamesTranslations;
  profile: ProfileTranslations;
  favourites: FavouritesTranslations;
  community: CommunityTranslations;
};

type RegisterTranslations = {
  welcome: string;
  please: string;
  backToHome: string;
  already: string;
  signIn: string;
  signUp: string;
  placeholder: {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  error: {
    fullname: {
      required: string;
    };
    email: {
      required: string;
      pattern: string;
    };
    password: {
      required: string;
      minLength: string;
    };
    confirmPasword: {
      required: string;
      notMatch: string;
    };
  };
  toast: {
    register: Omit<ToastTranslations, 'warning'>;
    google: Omit<ToastTranslations, 'warning'>;
  };
};

type LoginTranslations = {
  backToHome: string;
  forgot: string;
  dont: string;
  signIn: string;
  signUp: string;
  placeholder: {
    email: string;
    password: string;
  };
  error: {
    email: {
      required: string;
      pattern: string;
    };
    password: {
      required: string;
    };
  };
  toast: {
    login: Omit<ToastTranslations, 'warning'>;
    google: Omit<ToastTranslations, 'warning'>;
  };
};

type SupportTranslations = {
  content: string;
  donate: string;
  contribute: string;
};

type SettingsTranslations = {
  english: string;
  vietnamese: string;
  changeTo: string;
  label: {
    language: string;
    darkMode: string;
    notifications: string;
  };
};

type AboutTranslations = {
  version: string;
  social: string;
  disclaimer: string;
  content: string;
  button: {
    changeLog: string;
    license: string;
    facebook: string;
    github: string;
    twitter: string;
  };
};

type HomeTranslations = {
  find: string;
  search: string;
  emptyList: string;
  toast: Omit<ToastTranslations, 'success'>;
};

type InformationTranslations = {
  notAvailable: string;
  story: string;
  ingredients: string;
  steps: string;
  howToMake: string;
};

type SidebarTranslations = {
  home: string;
  community: string;
  games: string;
  favourites: string;
  myProfile: string;
  about: string;
  support: string;
  settings: string;
  welcome: string;
  signIn: string;
  signUp: string;
  signOut: string;
  profile: string;
};

type Game = {
  title: string;
  desc: String;
};

type GamesTranslations = {
  games: string;
  emptyList: string;
  win: string;
  lose: string;
  gameplayReset: string;
  wannaPlayAgain: string;
  wannaReset: string;
  playAgain: string;
  retry: string;
  quit: string;
  reset: string;
  cancel: string;
  matchFood: Game;
  guessFood: Game & {
    whatDish: string;
  };
  pickIngredients: Game;
  playNow: string;
};

type ProfileTranslations = {
  toast: Omit<ToastTranslations, 'warning'>;
  label: {
    name: string;
    email: string;
    password: string;
    signOut: string;
  };
};

type FavouritesTranslations = {
  emptyList: string;
  explore: string;
  toast: Pick<ToastTranslations, 'error'>;
};

type CommunityTranslations = {
  wall: {
    myFeed: string;
    myWall: string;
    wannaPost: string;
    love: string;
    comments: string;
    emptyList: string;
  };
  publish: {
    makePost: string;
    toast: ToastTranslations;
    writeThought: string;
    pick: string;
    publishPost: string;
  };
  comment: {
    comments: string;
    firstOne: string;
    postComment: string;
  };
};

type ToastTranslations = {
  success: string;
  error: {
    text1: string;
    text2: string;
  };
  warning: string;
};

const englishTranslations: Translations = {
  other: {
    appName: 'Vietnamese Cuisine',
    continueWith: 'or continue with',
    errorOccur: 'Some errors occurred',
    goBack: 'Go back',
    refreshing: 'Refreshing...',
  },
  register: {
    welcome: 'Welcome',
    please: 'Please fill out information to create an account',
    backToHome: 'Back to home',
    already: 'Already have an account?',
    signIn: 'SIGN IN',
    signUp: 'Sign Up',
    placeholder: {
      fullname: 'Fullname',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    },
    error: {
      fullname: {
        required: 'Your full name is required',
      },
      email: {
        required: 'Email is required',
        pattern: 'Please fill in valid email',
      },
      password: {
        required: 'Password is required',
        minLength: 'Password contains at least 6 characters',
      },
      confirmPasword: {
        required: 'Please confirm your password',
        notMatch: 'Confirm password not match',
      },
    },
    toast: {
      register: {
        success: 'Register sucessfully. Redirecting ...',
        error: {
          text1: 'Fail to register',
          text2: 'Email already in use',
        },
      },
      google: {
        success: 'Register sucessfully. Redirecting ...',
        error: {
          text1: 'Fail to register via Google',
          text2: 'Please try again',
        },
      },
    },
  },
  login: {
    backToHome: 'Back to home',
    dont: "Don't have an account?",
    forgot: 'Forgot password?',
    signUp: 'SIGN UP',
    signIn: 'Sign In',
    placeholder: {
      email: 'Email',
      password: 'Password',
    },
    error: {
      email: {
        required: 'Email is required',
        pattern: 'Please fill in valid email',
      },
      password: {
        required: 'Password is required',
      },
    },
    toast: {
      login: {
        success: 'Login sucessfully. Redirecting ...',
        error: {
          text1: 'Fail to login',
          text2: 'Invalid email or password',
        },
      },
      google: {
        success: 'Login sucessfully. Redirecting ...',
        error: {
          text1: 'Fail to login via Google',
          text2: 'Please try again',
        },
      },
    },
  },
  support: {
    content:
      'Vietnamese Cuisine is a small project with purpose introducing Vietnamese food, culture throughout the world. This project still in development for new version and enhancement. You can help us maintaining this project by actions.',
    donate: 'Donate us',
    contribute: 'Contribute on Github',
  },
  settings: {
    english: 'English',
    vietnamese: 'Vietnamese',
    changeTo: 'Change language to English',
    label: {
      language: 'Language',
      darkMode: 'Dark mode',
      notifications: 'Notifications',
    },
  },
  about: {
    version: 'Version 1.0',
    social: 'Social Media',
    disclaimer: 'Disclaimer',
    content:
      'Vietnamese Cuisine is unofficial, made by a small group of developer and is NOT affiliated to any organization.\nSome images used in this app are not copyrighted.',
    button: {
      changeLog: 'Change log',
      license: 'License',
      facebook: 'Like us on Facebook',
      github: 'Star us on Github',
      twitter: 'Follow us on Twitter',
    },
  },
  home: {
    find: "Let's find your favourite\nVietnamese food",
    search: 'Search',
    emptyList: 'No dish available!',
    toast: {
      error: {
        text1: 'Fail to love %{title}',
        text2: 'Please try again',
      },
      warning: 'This action requires authentication',
    },
  },
  information: {
    story: 'Story',
    ingredients: 'Ingredients',
    steps: 'Steps',
    notAvailable: 'Information not available',
    howToMake: 'How to make',
  },
  sidebar: {
    home: 'Home',
    community: 'Community',
    games: 'Games',
    favourites: 'Favourites',
    myProfile: 'My Profile',
    about: 'About Us',
    support: 'Support Us',
    settings: 'Settings',
    welcome: 'Welcome',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    profile: 'Profile',
  },
  games: {
    games: 'Games',
    emptyList: 'No game available!',
    playNow: 'Play now',
    lose: 'You lose 😭',
    win: 'You win 🥳',
    gameplayReset: 'Gameplay reset 🤔',
    wannaReset: 'Do you wanna reset your gameplay?',
    playAgain: 'Play again',
    wannaPlayAgain: 'Do you wanna play again?',
    retry: 'Retry',
    quit: 'Quit',
    reset: 'Reset',
    cancel: 'Cancel',
    matchFood: {
      title: 'Match Food',
      desc: 'Match Food is a classic memory game. Player takes turns flipping over two tiles at a time. If the two tiles match, they are removed from the board. If the tiles do not match, they are flipped back over.',
    },
    pickIngredients: {
      title: 'Pick Ingredients',
      desc: 'Pick Ingredients is a game challenge your knowledge. You need to find all main ingredients to make a Vietnamese dish in a provided set of ingredients. By dragging & dropping ingredients into a bag, you can win the game.',
    },
    guessFood: {
      title: 'Guess Food',
      desc: 'PicQuiz - Guess Pics',
      whatDish: 'What is this dish',
    },
  },
  profile: {
    label: {
      email: 'Email',
      name: 'Name',
      password: 'Password',
      signOut: 'Sign out',
    },
    toast: {
      success: 'Sign out successfully. Redirecting...',
      error: {
        text1: 'Fail to sign out',
        text2: 'Please try again',
      },
    },
  },
  favourites: {
    emptyList: 'No favourite dish',
    explore: 'Explore more Vietnamese food',
    toast: {
      error: {
        text1: 'Fail to unlike %{title}',
        text2: 'Please try again',
      },
    },
  },
  community: {
    wall: {
      myFeed: 'My Feed',
      myWall: 'My Wall',
      wannaPost: 'Wanna post somethings?',
      love: 'Love',
      comments: 'Comments',
      emptyList: 'No post available',
    },
    publish: {
      makePost: 'Make a Post',
      toast: {
        success: 'Publish your post successfully',
        error: {
          text1: 'Fail to publish your post',
          text2: 'Please try again',
        },
        warning: 'At least express your thought',
      },
      pick: 'Pick some images',
      writeThought: 'Write your thought',
      publishPost: 'Publish this post',
    },
    comment: {
      comments: 'Comments',
      firstOne: 'Be the first one \ncomment this post',
      postComment: 'Post your comment!',
    },
  },
};

const vietnameseTranslations: Translations = {
  other: {
    appName: 'Ẩm thực Việt',
    continueWith: 'hoặc tiếp tục với',
    errorOccur: 'Đã có lỗi xảy ra',
    goBack: 'Quay lại',
    refreshing: 'Làm mới ...',
  },
  register: {
    welcome: 'Chào mừng',
    please: 'Hãy điền đẩy đủ thông tin để tạo một tài khoản',
    backToHome: 'Trở về trang chủ',
    already: 'Bạn đã có tài khoản?',
    signIn: 'ĐĂNG NHẬP',
    signUp: 'Đăng ký',
    placeholder: {
      fullname: 'Họ và tên',
      email: 'Địa chỉ email',
      password: 'Mật khẩu',
      confirmPassword: 'Xác nhận mật khẩu',
    },
    error: {
      fullname: {
        required: 'Yêu cầu thông tin về họ và tên',
      },
      email: {
        required: 'Địa chỉ email là bắt buộc',
        pattern: 'Hãy nhập địa chỉ email hợp lệ',
      },
      password: {
        required: 'Yêu cầu cung cấp mật khẩu',
        minLength: 'Mật khẩu chứa tối thiểu 6 kí tự',
      },
      confirmPasword: {
        required: 'Hãy xác nhận mật khẩu của bạn',
        notMatch: 'Xác nhận mật khẩu không khớp',
      },
    },
    toast: {
      register: {
        success: 'Đăng ký thành công. Chuyển hướng ...',
        error: {
          text1: 'Đăng ký thất bại',
          text2: 'Địa chỉ email đã được sử dụng',
        },
      },
      google: {
        success: 'Đăng ký thành công. Chuyển hướng ...',
        error: {
          text1: 'Đăng ký bằng Google thất bại',
          text2: 'Hãy thử lại',
        },
      },
    },
  },
  login: {
    backToHome: 'Trở về trang chủ',
    dont: 'Bạn không có tài khoản?',
    forgot: 'Quên mật khẩu?',
    signUp: 'ĐĂNG KÝ',
    signIn: 'Đăng nhập',
    placeholder: {
      email: 'Địa chỉ email',
      password: 'Mật khẩu',
    },
    error: {
      email: {
        required: 'Địa chỉ email là bắt buộc',
        pattern: 'Hãy nhập địa chỉ email hợp lệ',
      },
      password: {
        required: 'Yêu cầu cung cấp mật khẩu',
      },
    },
    toast: {
      login: {
        success: 'Đăng nhập thành công. Chuyển hướng ...',
        error: {
          text1: 'Đăng nhập thất bại',
          text2: 'Địa chỉ email hoặc mật khẩu không hợp lệ',
        },
      },
      google: {
        success: 'Đăng nhập thành công. Chuyển hướng ...',
        error: {
          text1: 'Đăng nhập bằng Google thất bại',
          text2: 'Hãy thử lại',
        },
      },
    },
  },
  support: {
    content:
      'Ẩm thực Việt là một dự án nhỏ với mục đích giới thiệu nền ẩm thực cũng như văn hóa của Việt Nam tới bạn bè quốc tế. Dự án vẫn đang tiếp tục được cập nhật và phát triển để cho ra các phiên bản, tính năng, cải thiện mới. Bạn có thể giúp đỡ chúng tôi bằng những hành động thiết thực.',
    donate: 'Ủng hộ',
    contribute: 'Đóng góp trên Github',
  },
  settings: {
    english: 'Tiếng Anh',
    vietnamese: 'Tiếng Việt',
    changeTo: 'Đổi ngôn ngữ sang Tiếng việt',
    label: {
      language: 'Ngôn ngữ',
      darkMode: 'Chế độ tối',
      notifications: 'Thông báo',
    },
  },
  about: {
    version: 'Phiên bản 1.0',
    social: 'Mạng xã hội',
    disclaimer: 'Trách nhiệm',
    content:
      'Ẩm thực Việt là một ứng dụng không chính thức, được xây dựng và phát triển bỏi 1 nhóm nhỏ lập trình viên và không liên quan tới bất kỳ tổ thức nào.\nMột số hình ảnh được sử dụng trong ứng dụng không có xác thực bản quyền.',
    button: {
      changeLog: 'Cập nhật',
      license: 'Giấy phép',
      facebook: 'Thả like trên Facebook',
      github: 'Thả sao trên Github',
      twitter: 'Theo dõi trên Twitter',
    },
  },
  home: {
    find: 'Hãy tìm kiếm món ăn\nViệt Nam yêu thích',
    search: 'Tìm kiếm',
    emptyList: 'Không có món ăn nào!',
    toast: {
      error: {
        text1: 'Yêu thích %{title} món ăn thất bại',
        text2: 'Hãy thử lại',
      },
      warning: 'Hành động yêu cầu xác thực',
    },
  },
  information: {
    story: 'Câu chuyện',
    ingredients: 'Nguyên liệu',
    steps: 'Cách làm',
    notAvailable: 'Không có thông tin',
    howToMake: 'Xem cách làm',
  },
  sidebar: {
    home: 'Trang chủ',
    community: 'Cộng đồng',
    games: 'Trò chơi',
    favourites: 'Yêu thích',
    myProfile: 'Hồ sơ của tôi',
    about: 'Giới thiệu',
    support: 'Hỗ trợ',
    settings: 'Cài đặt',
    welcome: 'Xin chào',
    signIn: 'Đăng nhập',
    signUp: 'Đăng ký',
    signOut: 'Đăng xuất',
    profile: 'Hồ sơ',
  },
  games: {
    games: 'Trò chơi',
    emptyList: 'Không có trò chơi nào',
    playNow: 'Chơi ngay',
    lose: 'Thất bại 😭',
    win: 'Chiến thắng 🥳',
    gameplayReset: 'Bắt đầu lại trò chơi 🤔',
    wannaPlayAgain: 'Bạn có muốn chơi lại?',
    wannaReset: 'Bạn có muốn chơi lại từ đầu?',
    playAgain: 'Chơi lại',
    retry: 'Thử lại',
    quit: 'Thoát',
    cancel: 'Hủy',
    reset: 'Bắt đầu lại',
    matchFood: {
      title: 'Nối đồ ăn',
      desc: 'Nối đồ ăn là dạng trò chơi cổ điển giúp rèn luyện trí nhớ. Người chơi bắt đầu bằng việc lật 2 thẻ trong 1 lượt. Nếu 2 thẻ giống nhau, người chơi sẽ được cộng điểm và thẻ sẽ biến mất. Nếu 2 thẻ không giống nhau, thẻ sẽ bị úp lại',
    },
    pickIngredients: {
      title: 'Hãy chọn nguyên liệu đúng',
      desc: 'Hãy chọn nguyên liệu đúng là trò chơi thử thách sự hiểu biết của bạn về ẩm thực Việt Nam. Bạn cần tìm thấy tất cả các nguyên liệu cần thiết để chế biến 1 món ăn Việt Nam trong nhiều nguyên liệu được cung cấp. Bằng việc kéo và thả thật chính xác nguyên liệu và giỏ, bạn sẽ chiến thằng trò chơi',
    },
    guessFood: {
      title: 'Đoán món ăn',
      desc: 'Nhìn hình đoán món ăn',
      whatDish: 'Đây là món ăn gì',
    },
  },
  profile: {
    label: {
      email: 'Email',
      name: 'Họ tên',
      password: 'Mật khẩu',
      signOut: 'Đăng xuất',
    },
    toast: {
      success: 'Đăng xuất thành công. Chuyển hướng ...',
      error: {
        text1: 'Đăng xuất thất bại',
        text2: 'Hãy thử lại',
      },
    },
  },
  favourites: {
    emptyList: 'Bạn chưa có món ăn yêu thích',
    explore: 'Hãy khám phá nhiều hơn về ẩm thực Việt',
    toast: {
      error: {
        text1: 'Bỏ yêu thích %{title} thất bại',
        text2: 'Hãy thử lại',
      },
    },
  },
  community: {
    wall: {
      myFeed: 'Đề xuất',
      myWall: 'Tường nhà',
      wannaPost: 'Bạn muốn đăng bài?',
      love: 'Yêu thích',
      comments: 'Bình luận',
      emptyList: 'Chưa có bài viết nào',
    },
    publish: {
      makePost: 'Tạo bài viết',
      toast: {
        success: 'Đăng bài viết thành công',
        error: {
          text1: 'Đăng bài viết thất bại',
          text2: 'Hãy thử lại',
        },
        warning: 'Hãy viết điều gì đó',
      },
      pick: 'Chọn một số bức ảnh',
      writeThought: 'Cảm nghĩ của bạn',
      publishPost: 'Đăng bài viết này',
    },
    comment: {
      comments: 'Bình luận',
      firstOne: 'Hãy là người đầu tiên\nbình luận bài viết này',
      postComment: 'Bình luận của bạn',
    },
  },
};

export type Language = 'en' | 'vi';

export const translations: Record<Language, Translations> = {
  en: {
    ...enUs['en-US'],
    ...englishTranslations,
  },
  vi: {
    ...viVn.vi,
    ...vietnameseTranslations,
  },
};

export const i18n = new I18n(translations, {
  availableLocales: ['en', 'vi'],
  defaultLocale: 'en',
});
