import { ScreenNames } from '../../route/ScreenNames';

export const Users = [
    {
        USER_ID: 1,
        User_name: 'Ali',
        Password: '123',
        Email:'',
        UserAdress: '',
        UserPhone:'',
        UserType: 'Client',
    },
    {
        USER_ID: 2,
        User_name: 'Ahmed',
        Password: '000',
        Email:'',
        UserAdress: '',
        UserPhone:'',
        UserType: 'Provider',
    },
];
export const servicesData = [
    {
        service_id: 1,
        UserId: 1,
        servType: 'قاعات',
        title: 'قاعات الامير',
        subTitle: 'قاعة الامير لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم',
        desc: '',
        region: 'المثلث الشمالي',
        address: 'برطعة',
        workingRegion: [],
        servicePice: '',
        serviceStutes: '',
        
        
    },
    
];
export const hallData = [
    { key: '0', hallType: 'فندق',  img: (require('../assets/photos/hallIcon.png'))},
    { key: '1', hallType: 'مطعم',  img: (require('../assets/photos/hallIcon.png'))},
    { key: '2', hallType: 'قاعة داخلية', img: (require('../assets/photos/hallIcon.png')) },
    { key: '3', hallType: 'قاعة خارجية', img: (require('../assets/photos/hallIcon.png')) },
    
];  
    
export const regionData = [
    { key: '0', value: 'الجليل' },
    { key: '1', value: 'النقب '  },
    { key: '2', value: 'الساحل'  },
    { key: '3', value: 'المثلث الشمالي'  },
    { key: '4', value: 'المثلث الجنوبي'  },
    { key: '5', value: 'الضفة الغربية'  },
]
export const socialMediaList = [
    { key: '2', value: 'Facebook' },
    { key: '3', value: 'Instegram' },
    { key: '5', value: 'TikTok' },
    { key: '0', value: 'YouTube' },
    { key: '1', value: 'X'},
];
export const mandoteryOptions = [
    { key: '0', value: 'اجباري' ,alt:"Mandatory" },
    { key: '1', value: 'اختياري' , alt:"Optional" }
];
// export const ServiceImages = [
//     {
//         imgId: 1,
//         serviceID: 1,
//         image: (require('../../src/assets/photos/ameer.png')),
//         coverPhoto: true,
//     },
//     {
//         imgId: 2,
//         serviceID: 1,
//         image: (require('../../src/assets/photos/ameer.png')),
//         coverPhoto: false,
//     },
//     {
//         imgId: 3,
//         serviceID: 1,
//         image: (require('../../src/assets/photos/ameer.png')),
//         coverPhoto: false,
//     },
//     {
//         imgId: 1,
//         serviceID: 2,
//         image: (require('../../src/assets/photos/MaisAlrem.png')),
//         coverPhoto: true,
//     },
//     {
//         imgId: 2,
//         serviceID: 2,
//         image: (require('../../src/assets/photos/MaisAlrem.png')),
//         coverPhoto: false,
//     },
//     {
//         imgId: 3,
//         serviceID: 2,
//         image: (require('../../src/assets/photos/MaisAlrem.png')),
//         coverPhoto: false,
//     },
//     {
//         imgId: 1,
//         serviceID: 3,
//         image: (require('../../src/assets/photos/talmarah.png')),
//         coverPhoto: true,
//     },
    
// ];
export const subDetailData = [
    {
        orderItems: [
            {
                detial_id: 1, // 3sha 
                orderProducts: []
            },
            {
                detial_id: 2, // firewoks 
                orderProducts: []
            },
        ],
        request_Id: 1,
        UserID: 1,
    },
];
export const subDetail = [
    {
        subDetail_Id: 1,
        id:1,
        detailSubtitle: 'لحمة',
        detailSubtitleCost: 50,
        //imgSrc: (require('../../src/assets/photos/meat.png')),
    },
   
];
export const serviceDetail = [
    {
        detail_Id: 1,
        detailTitle: 'وجبة عشاء',
        SDserviceID: 1,
        serviceType: 'قاعات',
    },
    {
        detail_Id: 2,
        detailTitle: 'ألعاب نارية',
        serviceType: 'قاعات',
        SDserviceID: 1,
    },
    {
        detail_Id: 3,
        detailTitle: 'تفاصيل التصوير',
        SDserviceID: 4,
        serviceType: 'تصوير',
    },
];
export const servicesCategory = [
    {
        cat_id: 1,
        titleCategory: 'قاعات',
        img: (require('../assets/photos/hallIcon.png')),
    },
    {
        cat_id: 2,
        titleCategory: 'تصوير',
        img: (require('../assets/photos/CamIcon.png')),
    },
    {
        cat_id: 3,
        titleCategory: 'مطربين',
        img: (require('../assets/photos/singerIcon.png')),
    },
    {
        cat_id: 4,
        titleCategory: 'DJ',
        img: (require('../assets/photos/DJIcon.png')),
    },
    {
        cat_id: 5,
        titleCategory: 'شيف',
        img: (require('../assets/photos/chefIcon.png')),
    },
   
    {
        cat_id: 9,
        titleCategory: 'فرقة شعبية',
        img: (require('../assets/photos/fleklorTeamsIcon.png')),
    },
    {
        cat_id: 16,
        titleCategory: 'حلويات',
        img: (require('../assets/photos/SweetIcon.png')),
    },
    {
        cat_id: 11,
        titleCategory: 'تصميم ازهار',
        img: (require('../assets/photos/flowerIcon.png')),
    },
    {
        cat_id: 6,
        titleCategory: 'تصفيف شعر',
        img: (require('../assets/photos/saloonIcon.png')),
    },
    {
        cat_id: 8,
        titleCategory: 'Makeup',
        img: (require('../assets/photos/makeupIcon.png')),
    },
    {
        cat_id: 7,
        titleCategory: 'مركز تجميل',
        img: (require('../assets/photos/beutyCentreIcon.png')),
    },
    
    // {
    //     cat_id: 12,
    //     titleCategory: ' فساتين',
    //     img: (require('../assets/photos/dress.png')),
    // },
    // {
    //     cat_id: 13,
    //     titleCategory: 'بدلات عرسان',
    //     img: (require('../assets/photos/suit.png')),
    // },
    // {
    //     cat_id: 14,
    //     titleCategory: 'مجوهرات',
    //     img: (require('../assets/photos/jewelry.png')),
    // },
    // {
    //     cat_id: 15,
    //     titleCategory: 'اكسسوارات',
    //     img: (require('../assets/photos/accessories.png')),
    // },
   
    // {
    //     cat_id: 17,
    //     titleCategory: 'ألعاب نارية',
    //     img: (require('../assets/photos/fireworks.png')),
    // },
    {
        cat_id: 18,
        titleCategory: 'مهرج',
        img: (require('../assets/photos/jockerIcon.png')),
    },
    {
        cat_id: 19,
        titleCategory: 'أطفال',
        img: (require('../assets/photos/kidsIcon.png')),
    },


];
export const Events = [
    {
        EventId: 1,
        userId: 1,
        eventName: 'حفل زفاف',
        eventDate: '2/5/2023',
        eventCost: '1000',
    },
    {
        EventId: 2,
        userId: 1,
        eventName: 'عيد ميلاد',
        eventDate: '2/8/2023',
        eventCost: '500',
    },
];
export const Request = [
    {
        RequestId: 1,
        ReqEventId: 1,
        ReqServId: 1,
        ReqUserId: 1,
        ReqStatus: true,
        ReqDate: '10/1/2023',
        reservationDate: '12/1/2023',
        reservationTime: '14:30',
        Cost: 5000,
    },
    {
        RequestId: 2,
        ReqEventId: 1,
        ReqServId: 10,
        ReqUserId: 1,
        ReqStatus: true,
        ReqDate: '',
        reservationDate: '20/1/2023',
        reservationTime: '20:30',
        Cost: 10000,
    },
    {
        RequestId: 3,
        ReqEventId: 2,
        ReqServId: 5,
        ReqUserId: 1,
        ReqStatus: false,
        ReqDate: '',
        reservationDate: '30/1/2023',
        reservationTime: '18:30',
        Cost: 0,
    },

];
export const Payment = [
    {
        PayId: 1,
        ReqId: 1,
        PaymentAmount: 1000,
        PaymentDate: '',
    },

];

// export const fileFavorites = [
//     {
//         fileId: 1,
//         fileName: 'اقتراحاتي للحجز',
//         fileImg: (require('../../src/assets/sedawi.png')),
//         fileFavoUserId: 1,
//     },
//     {
//         fileId: 2,
//         fileName: 'اقتراحاتي',
//         fileImg: (require('../../src/assets/abofaneh.png')),
//         fileFavoUserId: 1,
//     },
// ];

export const favoritesList = [
    {
        favoListFileId: 1,
        favoListUserId: 1,
        favoListServiceId: 1,
    },
    {
        favoListFileId: 1,
        favoListUserId: 1,
        favoListServiceId: 7,
    },
    {
        favoListFileId: 2,
        favoListUserId: 1,
        favoListServiceId: 9,
    },
    {
        favoListFileId: 2,
        favoListUserId: 1,
        favoListServiceId: 15,
    },
];


