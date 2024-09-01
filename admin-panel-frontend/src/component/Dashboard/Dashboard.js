import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from 'axios';
import { MdOutlineAttachMoney } from "react-icons/md";
import { RotatingLines } from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';




const Dashboard = () => {

    const [data, setData] = useState([])
    const [sessionData, setSessionData] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [lodaed, setLoaded] = useState(true)

    const navigate = useNavigate()


    useEffect(() => {
        fetchDashboardData();
    }, []);
    const fetchDashboardData = async () => {
        console.log("first")
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/get-subscribers?identifier=admin`);
            setSessionData(response.data.data);
            setLoaded(false)
            console.log(response.data.data, "dataSession")
        } catch (error) {
            alert("Internal server Error, Unable get session details");
        }
    };

    //console.log(Object.keys(data).length < 0)

    const offset = currentPage * itemsPerPage;
    const currentPageData = sessionData?.slice(offset, offset + itemsPerPage);
    console.log("🚀 ~ Dashboard ~ currentPageData:", currentPageData)

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    useEffect(() => {
        setCurrentPage(0);
    }, [itemsPerPage])

    const unsubscribe = async (data) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/unsubscribe`, {
                "userId": data
            })
            if (res.data.status === true) {
                fetchDashboardData()
            }

        } catch (error) {
            console.log("🚀 ~ unsubscribe ~ error:", error)
            alert("server is down please try after sometime")

        }
    }
    const subscribe = async (data) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/subscribe`, {
                "userId": data
            })
            if (res.data.status === true) {
                fetchDashboardData()
            }

        } catch (error) {
            console.log("🚀 ~ subscribe ~ error:", error)

            alert("server is down please try after sometime")

        }
    }
    const block = async (data, identifier) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/block-unblock`, {
                "userId": data,
                "identifier": identifier
            })
            if (res.data.status === true) {
                fetchDashboardData()
            }

        } catch (error) {
            console.log("🚀 ~ subscribe ~ error:", error)

            alert("server is down please try after sometime")

        }
    }
    const deleteUser = async (data, identifier) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/delete`, {
                "userId": data,
                 
            })
            if (res.data.status === true) {
                fetchDashboardData()
            }

        } catch (error) {
            console.log("🚀 ~ subscribe ~ error:", error)

            alert("server is down please try after sometime")

        }
    }
    return (

        <div style={{ backgroundColor: "#d5c5c5" }}>{lodaed ?
            <div className=" d-flex justify-content-center align-items-center " style={{ minHeight: '100vh' }}>
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div> :
            <div>




              

                <div class="table-responsive" style={{ backgroundColor: "white" }}>
                    <table class="table table-striped  rounded-lg ">
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">user ID</th>

                                <th className="text-center" scope="col">Subscribed </th>
                                <th className="text-center" scope="col">Blocked</th>
                                <th className="text-center" scope="col">Subscribed Date</th>
                                <th className="text-center" scope="col">Action</th>





                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData?.length > 0 && currentPageData.map(item => (
                                <tr key={item}>
                                    <td className="text-center">{item.userid}</td>
                                    <td className="text-center">{item.isSubscribed ? "true" : "false"}</td>
                                    <td className="text-center">{item.isBlocked ? "true" : "false"}</td>
                                    <td className="text-center">{item.subscribedDate}</td>
                                    <td className="text-center"> <Dropdown>
                                        <Dropdown.Toggle as="i" />

                                        <Dropdown.Menu>
                                            {item.isSubscribed === true && <Dropdown.Item onClick={() => unsubscribe(item.userid)} style={{ color: "red" }}>Unubscribe</Dropdown.Item>}
                                            {item.isSubscribed === false && <Dropdown.Item onClick={() => subscribe(item.userid)} style={{ color: "green" }}>Subscribe</Dropdown.Item>}

                                            {item.isBlocked === true ? <Dropdown.Item style={{ color: " green" }} onClick={() => block(item.userid, "unblock")}>unblock</Dropdown.Item> :
                                                <Dropdown.Item style={{ color: " red" }} onClick={() => block(item.userid, "block")}>block</Dropdown.Item>}
                                            <Dropdown.Item style={{ color: "red" }} onClick={() => deleteUser(item.userid)}>delete</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </td>



                                </tr>
                            ))}
                            {sessionData?.length === 0 && <td colSpan={4}><h4 className="text-center" >No data!</h4></td>}

                        </tbody>

                    </table>
                    <div className="pagination-container  ">

                        <select
                            className="form-select form-select-sm items-per-page"
                            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                            value={itemsPerPage}
                            aria-placeholder="Items per page"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>

                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={Math.ceil(sessionData?.length / itemsPerPage)}
                            onPageChange={handlePageClick}
                            pageClassName="page-item"
                            forcePage={currentPage}
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />

                    </div>

                </div>


            </div>
        }


        </div>
    )
}


export default Dashboard;