export interface TechGroup {
  category: string
  items: string[]
}

export interface EducationItem {
  school: string
  detail: string
  period: string
}

export const profile = {
  name: '우호진',
  photo: '/img/woohojin.jpg',
  bio: 'Java/Spring 기반 백엔드 개발자를 목표로 하고 있습니다.\n기술을 그냥 가져다 쓰는 게 아니라, 왜 이 방식을 써야 하는지 이해하고 넘어가려고 하는 편입니다.\n하나의 프로젝트를 여러 기술 스택으로 갈아엎어보면서, 각 방식의 차이를 직접 몸으로 겪어본 경험이 강점입니다.',
  techStack: [
    {
      category: 'Backend',
      items: ['Java 17', 'Spring Boot 3.2.4', 'Spring Security', 'Spring Data JPA (Hibernate)', 'Redis', 'MySQL', 'Maven'],
    },
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'React (Vite)', 'Axios', 'React Router', 'Context API'],
    },
    {
      category: 'Infra / Tools',
      items: ['Oracle Cloud + Docker (배포 준비중)', 'Git', 'IntelliJ IDEA'],
    },
  ] as TechGroup[],
  education: [
    { school: '정석항공과학고등학교', detail: '항공전자과 졸업', period: '2017.03 ~ 2020.02' },
    { school: '동원대학교', detail: '컴퓨터영상디자인과 졸업', period: '2020.03 ~ 2022.02' },
    { school: '[현업 전문가 멘토링]', detail: '자바(JAVA)기반 백엔드 & AI 빅데이터 분석 양성과정', period: '2022.05.25 ~ 2022.11.09' },
  ] as EducationItem[],
  licenses: ['전자계산기기능사', '무선설비기능사'],
  contact: {
    github: 'https://github.com/woohojin',
    email: 'hojin0624@gmail.com',
    velog: 'https://velog.io/@woohojin',
  },
}
