import { Product } from '../models/productModel.js'
import { db } from "../config/database.js"
import { Sequelize } from 'sequelize';

const getActionListByChainId = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT action_id, action_name, action_url, action_type, action_weight, active
            FROM action_list
            WHERE chain_id = ${req.params.id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}
const getChainList = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT chain_id, chain_name, chain_active, max_action_count
            FROM chain_list;
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getChainList2 = async (req, res) => {
    try {
        const data = req.params.id.split(',')
        const ids = data.map(Number)
        const result = await db.query(`
            SELECT chain_id, chain_name
            FROM chain_list
            WHERE chain_id IN (${ids});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getBridgeList = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT bridge_id, bridge_name, bridge_url, bridge_weight
            FROM bridge_list;
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}


const getScriptList = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT script_id, script_name
            FROM script_list;
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getActionById = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT action_id, action_name, action_url, action_type, action_weight
            FROM action_list
            WHERE action_id = ${req.params.id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAvailableBridge = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT bridge_list.bridge_id, bridge_list.bridge_name, bridge_list.bridge_url, bridge_join.previous_chain_id
            FROM bridge_join
            JOIN bridge_list ON bridge_join.able_bridge_id = bridge_list.bridge_id
            WHERE bridge_join.current_chain_id = ${req.params.id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getChainListByBridgeList = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT DISTINCT cl.chain_id, cl.chain_name
            FROM chain_list cl
            WHERE cl.chain_id IN (
                SELECT DISTINCT bj.able_chain_id AS chain_id
                FROM bridge_join bj
                WHERE bj.able_bridge_id = ${req.params.id}
            )
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}


const addActionItem = async (req, res) => {
    try {
        const result = await db.query(`
            INSERT INTO action_list (action_name, action_url, action_type, chain_id, action_weight, active)
            VALUES ('${req.body.action_name}', '${req.body.action_url}', ${req.body.action_type}, ${req.body.chain_id}, ${req.body.action_weight}, "1 1 1 1");
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Create success" });
    }
}
const addBridgeItem = async (req, res) => {
    try {
        const result = await db.query(`
            INSERT INTO bridge_list (bridge_name, bridge_url, bridge_weight)
            VALUES ('${req.body.bridge_name}', '${req.body.bridge_url}', ${req.body.bridge_weight});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Create success" });
    }
}
const addChainItem = async (req, res) => {
    try {
        const result = await db.query(`
            INSERT INTO chain_list (chain_name)
            VALUES ('${req.body.chain_name}');
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Create success" });
    }
}

const addBridgeJoin = async (req, res) => {
    try {
        const result = await db.query(`
            INSERT INTO bridge_join ( able_chain_id, able_bridge_id )
            VALUES (${req.body.chain_id}, ${req.body.bridge_id});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Create success" });
    }
}

const updateActionItem = async (req, res) => {
    try {
        const result = await db.query(`
        UPDATE action_list
        SET action_name = '${req.body.action_name}', action_url = '${req.body.action_url}', action_weight = ${req.body.action_weight}
        WHERE action_id = ${req.params.id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Update success" });
    }
}
const updateActiveAction = async (req, res) => {
    try {
        const result = await db.query(`
        UPDATE action_list
        SET active = '${req.body.new_values}'
        WHERE action_id = ${req.body.action_id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Update success" });
    }
}

const updateBridge = async (req, res) => {
    try {
        const result = await db.query(`
        UPDATE bridge_list
        SET bridge_name = '${req.body.bridge_name}', bridge_url = '${req.body.bridge_url}', bridge_weight = '${req.body.bridge_weight}'
        WHERE bridge_id = ${req.body.bridge_id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Update success" });
    }
}

const updateActiveChain = async (req, res) => {
    try {
        const result = await db.query(`
        UPDATE chain_list
        SET chain_active = '${req.body.new_values}'
        WHERE chain_id = ${req.body.chain_id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Update success" });
    }
}

const updateMaxActionCount = async (req, res) => {
    try {
        const result = await db.query(`
        UPDATE chain_list
        SET max_action_count = '${req.body.max_action_count}'
        WHERE chain_id = ${req.body.chain_id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Update success" });
    }
}

const deleteSelectedItem = async (req, res) => {
    try {
        const data = req.params.id.split(',')
        const ids = data.map(Number)
        const result = await db.query(`
            DELETE FROM action_list
            WHERE action_id IN (${ids});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Delete success" })
    }
}
const deleteChain = async (req, res) => {
    try {
        const result = await db.query(`
            DELETE FROM chain_list
            WHERE chain_id IN (${req.params.id});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Delete success" })
    }
}

const deleteBridge = async (req, res) => {
    try {
        const result = await db.query(`
            DELETE FROM bridge_list
            WHERE bridge_id IN (${req.params.id});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Delete success" })
    }
}

const deleteChainFromBridge = async (req, res) => {
    try {
        const result = await db.query(`
            DELETE FROM bridge_join
            WHERE able_chain_id = ${req.body.chain_id} and able_bridge_id = ${req.body.bridge_id}
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Delete success" })
    }
}

export {
    addActionItem,
    addChainItem,
    addBridgeItem,
    addBridgeJoin,

    getActionById,
    getBridgeList,
    getChainList2,
    getAvailableBridge,
    getActionListByChainId,
    getChainListByBridgeList,
    getChainList,
    getScriptList,

    updateActionItem,
    updateMaxActionCount,
    updateActiveAction,
    updateActiveChain,
    updateBridge,

    deleteSelectedItem,
    deleteChain,
    deleteBridge,
    deleteChainFromBridge
}