package database

func (sqlh *SQLHandler) Migration() {
	sqlh.DB.AutoMigrate(&DBPing{})
}
