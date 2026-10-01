/**
 * @swagger
 * tags:
 *   - name: Songs
 *   - name: Artists
 *   - name: Characters
 *   - name: Character Teams
 *   - name: Character Weapons
 * paths:
 *   /songs:
 *     get:
 *       tags: [Songs]
 *       summary: List songs
 *       responses:
 *         '200':
 *           description: Songs returned successfully
 *     post:
 *       tags: [Songs]
 *       summary: Create a song
 *       responses:
 *         '200':
 *           description: Song created successfully
 *   /songs/{id}:
 *     get:
 *       tags: [Songs]
 *       summary: Get a song by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Song returned successfully
 *     put:
 *       tags: [Songs]
 *       summary: Update a song
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Song updated successfully
 *     delete:
 *       tags: [Songs]
 *       summary: Delete a song
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Song deleted successfully
 *   /songs/bulk/create:
 *     post:
 *       tags: [Songs]
 *       summary: Create songs in bulk
 *       responses:
 *         '200':
 *           description: Songs created successfully
 *   /artists:
 *     get:
 *       tags: [Artists]
 *       summary: List artists
 *       responses:
 *         '200':
 *           description: Artists returned successfully
 *     post:
 *       tags: [Artists]
 *       summary: Create an artist
 *       responses:
 *         '200':
 *           description: Artist created successfully
 *   /artists/bulk/create:
 *     post:
 *       tags: [Artists]
 *       summary: Create artists in bulk
 *       responses:
 *         '200':
 *           description: Artists created successfully
 *   /artists/{id}:
 *     put:
 *       tags: [Artists]
 *       summary: Update an artist
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Artist updated successfully
 *     delete:
 *       tags: [Artists]
 *       summary: Delete an artist
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Artist deleted successfully
 *   /characters:
 *     get:
 *       tags: [Characters]
 *       summary: List characters
 *       responses:
 *         '200':
 *           description: Characters returned successfully
 *     post:
 *       tags: [Characters]
 *       summary: Get characters by criteria or add characters in bulk
 *       responses:
 *         '200':
 *           description: Character operation completed successfully
 *   /character/{id}:
 *     get:
 *       tags: [Characters]
 *       summary: Get a character by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Character returned successfully
 *     put:
 *       tags: [Characters]
 *       summary: Update a character by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: number
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - char_name
 *               properties:
 *                 char_name:
 *                   type: string
 *                   example: Jane Doe
 *                 sex:
 *                   type: string
 *                   example: F
 *                 char_team:
 *                   type: integer
 *                   example: 1
 *                   description: Team ID get from /charTeams endpoint
 *                 char_weapon:
 *                   type: integer
 *                   example: 1
 *                   description: Weapon ID get from /charWeapons endpoint
 *                 char_model:
 *                   type: integer
 *                   example: 1
 *                   description: Character model ID get from /charModels endpoint
 *                 char_element:
 *                   type: integer
 *                   example: 2
 *                   description: Character element ID get from /charElements endpoint
 *                 char_star:
 *                   type: integer
 *                   example: 5
 *                   description: Character star rating
 *                 guess_type:
 *                   type: integer
 *                   example: 1
 *                   description: Guess type ID get from /guessTypes endpoint
 *       responses:
 *         '200':
 *           description: Character updated successfully
 *     delete:
 *       tags: [Characters]
 *       summary: Delete a character
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Character deleted successfully
 *   /characters/search/{name}:
 *     get:
 *       tags: [Characters]
 *       summary: Search characters by name
 *       parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Matching characters returned successfully
 *   /charTeams:
 *     get:
 *       tags: [Character Teams]
 *       summary: List character teams
 *       responses:
 *         '200':
 *           description: Character teams returned successfully
 *     post:
 *       tags: [Character Teams]
 *       summary: Create character teams in bulk
 *       responses:
 *         '200':
 *           description: Character teams created successfully
 *   /charTeams/{id}:
 *     put:
 *       tags: [Character Teams]
 *       summary: Update a character team
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Character team updated successfully
 *     delete:
 *       tags: [Character Teams]
 *       summary: Delete a character team
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Character team deleted successfully
 *   /charWeapons:
 *     get:
 *       tags: [Character Weapons]
 *       summary: List character weapons
 *       responses:
 *         '200':
 *           description: Character weapons returned successfully
 *     post:
 *       tags: [Character Weapons]
 *       summary: Create character weapons in bulk
 *       responses:
 *         '200':
 *           description: Character weapons created successfully
 *   /charWeapon/{id}:
 *     put:
 *       tags: [Character Weapons]
 *       summary: Update a character weapon
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Character weapon updated successfully
 *     delete:
 *       tags: [Character Weapons]
 *       summary: Delete a character weapon
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Character weapon deleted successfully
 */
