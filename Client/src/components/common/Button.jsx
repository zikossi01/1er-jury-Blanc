const Button = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState({});
    return(
        <>
            <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 rounded-lg text-sm px-10 py-2.5 text-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-black dark:hover:bg-green-600 dark:focus:ring-green-800">add project</button>
        </>
    )
}

export default Button 