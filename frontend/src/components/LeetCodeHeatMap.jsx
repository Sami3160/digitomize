import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';

export default function LeetCodeHeatmap({ username }) {
    const [heatmapData, setHeatmapData] = useState([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 
    useEffect(() => {
        axios.post(`${apiBaseUrl}/users/getHeatData`, {
            query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submissionCalendar
            }
          }
        `,
            variables: { username },
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                const calendarString = res.data.data.matchedUser.submissionCalendar;
                const calendarObj = JSON.parse(calendarString);

                // Format to array: { date: "YYYY-MM-DD", count: number }
                const formattedData = Object.entries(calendarObj).map(([timestamp, count]) => {
                    const date = new Date(parseInt(timestamp) * 1000)
                        .toISOString()
                        .split('T')[0];
                    return { date, count };
                });
                console.log(formattedData);

                setHeatmapData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching LeetCode data:', error);
            });
    }, [username]);

    const today = new Date();
    const yearAgo = new Date();
    yearAgo.setFullYear(today.getFullYear() - 1);

    return (
        <div className='border rounded-md p-2 mt-4 bg-[#1a1a1a]'>
            <h2 className="text-xl font-bold mb-4 text-white">{username}'s LeetCode Activity</h2>
            <CalendarHeatmap
                startDate={yearAgo}
                endDate={today}
                values={heatmapData}
                classForValue={(value) => {
                    if (!value) return 'color-empty';
                    if (value.count >= 20) return 'color-scale-4';
                    if (value.count >= 10) return 'color-scale-3';
                    if (value.count >= 5) return 'color-scale-2';
                    return 'color-scale-1';
                }}
                tooltipDataAttrs={(value) =>
                    value.date ? { 'data-tooltip-id': 'tooltip', 'data-tooltip-content': `${value.date}: ${value.count} submissions` } : {}
                }
                showWeekdayLabels
            />
            <ReactTooltip id="tooltip" />
        </div>
    );
}
