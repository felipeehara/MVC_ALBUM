// components/ButtonAdd.tsx
interface ButtonAddProps {
  onClick: () => void;
}

const ButtonAdd = ({ onClick }: ButtonAddProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-8 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
    >
      Adicionar Álbum
    </button>
  );
};

export default ButtonAdd;
