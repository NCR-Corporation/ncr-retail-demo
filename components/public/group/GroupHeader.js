import { Container, Card, CardImgOverlay, CardTitle, CardImg } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
export default function GroupHeader({ isLoading, data }) {
  if (isLoading) {
    return (
      <Card inverse className="card-group-header">
        <CardImgOverlay className="card-img-overlay d-flex flex-wrap align-items-center">
          <Container>
            <CardTitle tag="h2" className="image-overlay-title">
              <Skeleton width="33%" />
            </CardTitle>
          </Container>
        </CardImgOverlay>
      </Card>
    );
  }
  return (
    <>
      <Card className="card-group-header" inverse>
        <CardImg
          src={data.group.data.tag}
          className="w-100"
          style={{
            width: '100%',
            height: '150px',
            opacity: '0.75',
            objectFit: 'cover'
          }}
        />
        <CardImgOverlay className="card-img-overlay d-flex flex-wrap align-items-center">
          <Container>
            <CardTitle tag="h2" className="image-overlay-title">
              {data.group.data.title.values[0].value}
            </CardTitle>
          </Container>
        </CardImgOverlay>
      </Card>
    </>
  );
}
