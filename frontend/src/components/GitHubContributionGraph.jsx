import { useEffect, useState } from "react";
import "./GitHubContributionGraph.css"; // Assuming you have a CSS file for styles

const GitHubContributionGraph = ({ data }) => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    // Generate squares based on the provided data
    const generateSquares = () => {
      const squaresArray = [];
      for (let i = 0; i < 365; i++) {
        const level = data[i] || 0; // Use provided data or default to 0
        squaresArray.push(<li key={i} data-level={level}></li>);
      }
      setSquares(squaresArray);
    };

    generateSquares();
  }, [data]);

  const getDateFromIndex = (index) => {
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const resultDate = new Date(startDate.setDate(startDate.getDate() + index));
    return resultDate.toDateString();
  };
  useEffect(() => {
    const squaresList = document.querySelectorAll(".squares li");
    squaresList.forEach((square, index) => {
      square.addEventListener("mouseover", (event) =>
        handleMouseOver(event, index)
      );
    });

    return () => {
      squaresList.forEach((square) => {
        square.removeEventListener("mouseover", (event) =>
          handleMouseOver(event, index)
        );
      });
    };
  }, [squares]);

  const handleMouseOver = (event, index) => {
    const date = getDateFromIndex(index);
    event.target.setAttribute("title", date);
  };

  return (
    <div className="graph text-white">
      <ul className="months">
        <li>Jan</li>
        <li>Feb</li>
        <li>Mar</li>
        <li>Apr</li>
        <li>May</li>
        <li>Jun</li>
        <li>Jul</li>
        <li>Aug</li>
        <li>Sep</li>
        <li>Oct</li>
        <li>Nov</li>
        <li>Dec</li>
      </ul>
      <ul className="days ">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul className="squares">{squares}</ul>
    </div>
  );
};

export default GitHubContributionGraph;
