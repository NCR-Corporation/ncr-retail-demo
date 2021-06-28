import Skeleton from 'react-loading-skeleton';
const LoadingTable = () => {
  return (
    <tbody>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
        <tr key={item}>
          <td colSpan="8">
            <Skeleton width="100%" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default LoadingTable;
