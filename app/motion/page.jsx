'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBeer } from "react-icons/fa";

export default function Home() {
    const [isDraggingDiv1, setIsDraggingDiv1] = useState(false);
    const [isDraggingDiv2, setIsDraggingDiv2] = useState(false);

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
            }}
        >
            {/* DIV 1 */}
            <motion.div
                drag
                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                dragElastic={0.3}
                onDragStart={() => setIsDraggingDiv1(true)}
                onDragEnd={() => setIsDraggingDiv1(false)}
                whileDrag={{ scale: 1.1, rotate: 15, boxShadow: "0px 20px 30px rgba(0,0,0,0.3)" }}
                whileHover={{ scale: 1.05, rotate: 5, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    width: 180,
                    height: 180,
                    borderRadius: 25,
                    backgroundColor: "#f55c0a",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    cursor: "grab",
                    userSelect: "none",
                }}
            >
                Drag Me 1
            </motion.div>

            {/* DIV 2 */}
            <motion.div
                drag
                dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                dragElastic={0.5}
                onDragStart={() => setIsDraggingDiv2(true)}
                onDragEnd={() => setIsDraggingDiv2(false)}
                whileDrag={{
                    scale: 1.15,
                    rotate: -10,
                    boxShadow: "0px 25px 35px rgba(0,0,0,0.35)",
                }}
                whileHover={{
                    scale: 1.08,
                    rotate: -5,
                    boxShadow: "0px 15px 25px rgba(0,0,0,0.25)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                style={{
                    width: 180,
                    height: 180,
                    borderRadius: 25,
                    backgroundColor: "#00bfff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    cursor: "grab",
                    userSelect: "none",
                }}
            >
                Drag Me 2
            </motion.div>


            <FaBeer />
        </div>
    );
}
