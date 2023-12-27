type TChooseGame ={
  imageUrl: object
  title: string,
  badgeText: string,
  description: string,
  buttonText: string,
  to: string
}

interface TChooseGameWithClick extends TChooseGame {
  onClick: () => void;
}