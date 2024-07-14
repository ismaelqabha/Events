import { ScreenNames } from '../../route/ScreenNames';


export const EventType = [
    { key: '0', eventTitle: 'زفاف', img: (require('../assets/photos/wedding.png')) },
    { key: '1', eventTitle: 'خطوبة', img: (require('../assets/photos/engagment.png')) },
    { key: '2', eventTitle: 'ذكرى زواج', img: (require('../assets/photos/MariedAnvesrary.png')) },
    { key: '3', eventTitle: 'تخرج', img: (require('../assets/photos/graduation.png')) },
    { key: '4', eventTitle: 'وليمة', img: (require('../assets/photos/feastEvent.png')) },
    { key: '5', eventTitle: 'مولود جديد', img: (require('../assets/photos/newPorn.png')) },
    { key: '6', eventTitle: 'عيد ميلاد', img: (require('../assets/photos/BDEvent.png')) },
    { key: '7', eventTitle: 'اجتماع عمل', img: (require('../assets/photos/meeting.png')) },
    { key: '8', eventTitle: 'مؤتمر', img: (require('../assets/photos/coference.png')) }

];
export const hallData = [
    { key: '0', hallType: 'فندق', img: (require('../assets/photos/hotel.png')) },
    { key: '1', hallType: 'مطعم', img: (require('../assets/photos/restaurant.png')) },
    { key: '2', hallType: 'قاعة داخلية', img: (require('../assets/photos/externalHall.png')) },
    { key: '3', hallType: 'قاعة خارجية', img: (require('../assets/photos/hallIcon.png')) },

];

export const regionData = [
    { key: "الجليل الأعلى", value: ["ترشيحا", "حرفيش", "معليا", "البقيعة", "بيت جن", "فسوطة", "المغار","كسرى",  "الرامة" ,"ساجور", "نحف" ," دير الأسد-البعنة" ," وادي سلامة" , "طوبا" , "الزنغرية"] },
    { key: '1', value: 'النقب ' },
    { key: '2', value: 'الساحل' },
    { key: '3', value: 'المثلث الشمالي' },
    { key: '4', value: 'المثلث الجنوبي' },
    { key: '5', value: 'الضفة الغربية' },

]
export const socialMediaList = [
    { key: '0', value: 'facebook' },
    { key: '1', value: 'instagram' },
    { key: '2', value: 'tiktok' },
    { key: '3', value: 'youtube' },
    { key: '4', value: 'X' },
];
export const mandoteryOptions = [
    { key: '0', value: 'اجبارية', alt: "Mandatory" },
    { key: '1', value: 'اختيارية', alt: "Optional" }
];
export const hallDetailOptions = [
    { key: '0', value: 'وجبات طعام' },
    { key: '1', value: 'تزيين' },
    { key: '2', value: 'ضيافة' },
    { key: '3', value: 'أخرى' }
];

export const requst =[
    {
        requestID:'',
        ReqEventId: 1,
        ReqServId: 1,
        ReqUserId: 1,
        ReqStatus: '',
        ReqDate: '10/1/2023',
        Cost: 5000,
        reqDetail: [
            {
                reservationDate: '12/1/2023',
                reservationTime: '14:30',
                subDetailId: []
            }
        ]
    }
]
export const subDetail = [
    {
        subDetail_Id: 1,
        id: 1,
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
    {
        cat_id: 17,
        titleCategory: 'تأجير معدات',
        img: (require('../assets/photos/tools.png')),
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


