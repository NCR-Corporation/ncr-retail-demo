import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
const HomeGroups = ({ isError, isLoading, userStore, data }) => {
  return (
    <div className="index-list mb-4 row">
      {!isError && (
        <Row className="w-100">
          {!isLoading && userStore.id && data && data.home && data.home.length > 0
            ? data.home.map((element) => (
                <Col md={6} key={element.group.data.groupId.groupCode}>
                  <Card className="d-flex align-items-center justify-content-center flex-row p-4 h-100">
                    <CardBody>
                      <CardTitle tag="h2" className="text-white">
                        {element.group.data.title.values[0].value}
                      </CardTitle>
                      <Link href={`/group/${element.group.data.groupId.groupCode}`}>
                        <a className="btn btn-light">Shop Now</a>
                      </Link>
                    </CardBody>
                    <Image
                      src={element && element.group && element.group.data && element.group.data.tag ? element.group.data.tag : ''}
                      alt={`${element.group.data.title.values[0].value}`}
                      objectFit="cover"
                      width={200}
                      height={200}
                      className="rounded-circle"
                    />
                  </Card>
                </Col>
              ))
            : [...Array(2).keys()].map((index) => (
                <Col md={6} key={index}>
                  <Card className="d-flex align-items-center justify-content-center flex-row p-4 h-100">
                    <CardBody>
                      <CardTitle tag="h2" className="text-white w-100">
                        <Skeleton width="100%" />
                      </CardTitle>
                      <Skeleton width="25%" />
                    </CardBody>
                    <div className="p-4">
                      <Skeleton height="170px" width="170px" className="rounded-circle" />
                    </div>
                  </Card>
                </Col>
              ))}
        </Row>
      )}
    </div>
  );
};

export default HomeGroups;
