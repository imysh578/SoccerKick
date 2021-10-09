var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(33.450705, 126.570677), // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };

// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);
///

var positions = [
  {
    title: '광명',
    latlng: new kakao.maps.LatLng(33.450705, 126.570677),
    content: '<div style="padding:5px;">광명</div>',
  },
  {
    title: '천호',
    latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    content: '<div style="padding:5px;">천호</div>',
  },
  {
    title: '중랑',
    latlng: new kakao.maps.LatLng(33.450879, 126.56994),
    content: '<div style="padding:5px;">중랑</div>',
  },
  {
    title: '경일',
    latlng: new kakao.maps.LatLng(33.451393, 126.570738),
    content: '<div style="padding:5px;">경일</div>',
  },
];
function panTo(where) {
  //노가다부분
  // 이동할 위도 경도 위치를 생성합니다
  positions.forEach((el) => {
    var moveLatLon = el.latlng; // var moveLatLon = 뉴카카맵(좌표)에서 수정, position들의 좌표로 반복으로받아온다
    if (el.title == where) {
      map.panTo(moveLatLon);
    }
  });

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
}

// 마커 이미지의 이미지 주소입니다
var imageSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

for (var i = 0; i < positions.length; i++) {
  // 마커 이미지의 이미지 크기 입니다
  var imageSize = new kakao.maps.Size(24, 35);

  // 마커 이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[i].latlng, // 마커를 표시할 위치
    title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    image: markerImage, // 마커 이미지
  });
  //인포윈도우 생성.
  var infowindow = new kakao.maps.InfoWindow({
    content: positions[i].content,
  });
  infowindow.open(map, marker);
}

//검색버튼 설정 addeventlist가 onclick보다 호환성빼고 다좋음. 여러가지실행가능.
var mapbtn = document.getElementById('mapbtn');
var input = document.getElementById('input');

mapbtn.addEventListener('click', function () {
  //두번째 인자에 콜백함수안에 함수?
  panTo(input.value); //panTo()의 값을 그냥 input이아닌 .value로 받아옴.
});
