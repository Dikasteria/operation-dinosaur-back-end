const { connection } = require('../server/connection');


const fetchUserIdFromAmazonId = async (amazon_id) => {
    if (!amazon_id || amazon_id.length === 0) return false
    const data =  await connection('users')
        .leftJoin('devices', 'users.id', '=', 'devices.user_id')
        .groupBy('devices.user_id', 'devices.amazon_id')
        .select('devices.user_id', 'devices.amazon_id')
        .where({amazon_id})
    if (data.length === 0) return false
    const [{user_id: output}] = data
    return output
}

module.exports = { fetchUserIdFromAmazonId }
